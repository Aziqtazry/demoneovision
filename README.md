# Deploy the flood dashboard to AWS

This Next.js app deploys through **Docker → Amazon ECR → Amazon ECS Express Mode**. Run all commands from `C:\Users\Aziqtazry\Desktop\project`.

> The current login uses hard-coded demo users in browser code and `localStorage`. Camera and monitoring data are placeholders. Treat the public deployment as a demo until server-side authentication and live data are added.

## 1. Sign in and select the Region

```powershell
aws login --region ap-southeast-2
aws configure set region ap-southeast-2
aws sts get-caller-identity
```

The remaining examples use Sydney (`ap-southeast-2`).

## 2. Build and test locally

```powershell
cd C:\Users\Aziqtazry\Desktop\project
docker compose up --build -d
Invoke-WebRequest http://localhost:3000/login
```

Open <http://localhost:3000/login>. View logs with `docker compose logs -f dashboard` and stop it with `docker compose down`.

## 3. Create ECR and push the image

```powershell
$region = "ap-southeast-2"
$repoName = "flood-detection-dashboard"
$accountId = aws sts get-caller-identity --query Account --output text
$registry = "${accountId}.dkr.ecr.${region}.amazonaws.com"
$imageUri = "${registry}/${repoName}"
aws ecr create-repository --repository-name $repoName --region $region --image-scanning-configuration scanOnPush=true
aws ecr get-login-password --region $region | docker login --username AWS --password-stdin $registry
docker build --platform linux/amd64 -t "${repoName}:v1" .
docker tag "${repoName}:v1" "${imageUri}:v1"
docker push "${imageUri}:v1"
```

Create the repository only once. If Docker Desktop's Windows credential helper returns `The stub received bad data`, use a temporary Docker config, push with `docker --config $tempDockerConfig`, and delete that directory afterward.

## 4. Create the ECS Express Mode roles

### Free-tier demo alternative: Amplify static hosting

The current dashboard exports completely as static files, so a demo does not need a continuously running container or load balancer. Build the static version and zip its contents:

```powershell
$env:BUILD_STATIC_EXPORT = "true"
npm.cmd run build
python scripts\build-amplify-package.py
```

In the AWS Amplify console, choose **Create new app → Deploy without Git → Drag and drop**, then upload the ZIP printed by the packaging script. The script creates ZIP entry names with forward slashes, which Amplify requires when extracting nested `_next` assets. This avoids ECS and Application Load Balancer charges. A small demo is normally covered by Amplify's Free Tier limits, subject to the account's eligibility and current limits.

Continue below only when you need a running container rather than static demo hosting.

AWS App Runner is closed to new customers. AWS recommends ECS Express Mode, which provisions a Fargate service, Application Load Balancer, HTTPS endpoint, auto scaling, networking, and logging.

The required trust policies are included under `deploy/aws`:

```powershell
aws iam create-role --role-name ecsTaskExecutionRole --assume-role-policy-document file://deploy/aws/ecs-task-trust-policy.json
aws iam attach-role-policy --role-name ecsTaskExecutionRole --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy
aws iam create-role --role-name ecsInfrastructureRoleForExpressServices --assume-role-policy-document file://deploy/aws/ecs-infrastructure-trust-policy.json
aws iam attach-role-policy --role-name ecsInfrastructureRoleForExpressServices --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSInfrastructureRoleforExpressGatewayServices
```

Each role is created only once. IAM may take about a minute to make a new role available.

## 5. Create the public ECS service

Confirm that the Region has a default VPC:

```powershell
aws ec2 describe-vpcs --filters Name=is-default,Values=true --region $region --query "Vpcs[0].VpcId" --output text
```

Create the service input file:

```powershell
$serviceConfig = @{
  executionRoleArn = "arn:aws:iam::${accountId}:role/ecsTaskExecutionRole"
  infrastructureRoleArn = "arn:aws:iam::${accountId}:role/ecsInfrastructureRoleForExpressServices"
  serviceName = "flood-detection-dashboard"
  healthCheckPath = "/login"
  primaryContainer = @{ image = "${imageUri}:v1"; containerPort = 3000 }
  scalingTarget = @{ minTaskCount = 1; maxTaskCount = 2 }
}
$serviceConfig | ConvertTo-Json -Depth 5 | Set-Content deploy/aws/ecs-express-service.json
```

Deploy:

```powershell
aws ecs create-express-gateway-service --cli-input-json file://deploy/aws/ecs-express-service.json --monitor-resources DEPLOYMENT --monitor-mode TEXT-ONLY --region $region
```

Provisioning normally takes several minutes. When the status becomes `ACTIVE`, open the HTTPS URL returned by the command and append `/login`.

ECS Express Mode has no separate service fee, but the Fargate tasks, Application Load Balancer, logs, data transfer, and ECR storage incur charges.

## 6. Remove the demo deployment

Delete the ECS Express service when testing is finished so its managed compute and load-balancer resources stop accruing charges. You may also delete unused ECR images and IAM roles.

## References

- [Next.js Docker deployment](https://nextjs.org/docs/app/getting-started/deploying)
- [Push an image to Amazon ECR](https://docs.aws.amazon.com/AmazonECR/latest/userguide/getting-started-cli.html)
- [Create an ECS Express Mode service](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/express-service-getting-started.html)
- [AWS App Runner availability change](https://docs.aws.amazon.com/apprunner/latest/dg/apprunner-availability-change.html)
