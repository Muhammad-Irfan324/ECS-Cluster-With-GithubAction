**FOR RUNNING DOCKER IMAGE LOCALLY**

    Build Docker Image    
    - docker build . -t hello-world/node:latest
    For passing env for SECRET_VALUE and PORT pass with -e flag
    - docker run --name helloworld -e SECRET_VALUE=my-secret-value -p 80:80 -d hello-world/node

#############################

**For Pushing to ECR**

    - aws ecr get-login-password --region <your-region> | docker login --username AWS --password-stdin <your-account-id>.dkr.ecr.<your-region>.amazonaws.com
    - docker build -t node-hello-world .
    - docker tag node-hello-world:latest <your-account-id>.dkr.ecr.<your-region>.amazonaws.com/<repo-name>:<tag>
    - docker push <your-account-id>.dkr.ecr.<your-region>.amazonaws.com/<repo-name>:<tag>

#############################

**PREREQUISITE for WorkFlow**

    These secrets needs to be added first in Github Secrets
    - AWS_ACCESS_KEY_ID
    - AWS_SECRET_ACCESS_KEY
    - SECRET_VALUE
    - ALB_DNS_NAME
 ![SECRETS](https://github.com/Muhammad-Irfan324/ECS-Cluster-With-GithubAction/blob/main/Selection_999(258).png)
    
#############################

**Passing ECS Cluster related info in workflow deployment.yml**

We can either pass this through env or pass directly in the [file](./.github/workflows/deployment.yml).
    
    - AWS_REGION
    - ECR_REPOSITORY
    - ECS_SERVICE
    - ECS_CLUSTER
    - CONTAINER_NAM
    - environment

#############################

**WorkFlow Steps performed**

    - git checkout
    - Configure AWS credentials from Secrets
    - Login to Amazon ECR
    - Build, tag, and push image to Amazon ECR
    - Update the task definition with new image & new SECRET_VALUE
    - Sanity Check

# TASKS - Things to think about:
    It should also make use of one secret variable passed by the pipeline and 
    the index page can show hello world ${secret-value}
 ![Secret-Value](https://github.com/Muhammad-Irfan324/ECS-Cluster-With-GithubAction/blob/main/Selection_999(265).png)
 ![PASS-Secret](https://github.com/Muhammad-Irfan324/ECS-Cluster-With-GithubAction/blob/main/pass-secrets-in-workflow.png)
 ![DNS-NAME](https://github.com/Muhammad-Irfan324/ECS-Cluster-With-GithubAction/blob/main/Selection_999(266).png)
#############################

**what triggers a deploy**

    Adding a commit in the main branch will trigger the deployment 
 ![TRIGGER](https://github.com/Muhammad-Irfan324/ECS-Cluster-With-GithubAction/blob/main/Selection_999(259).png)

#############################

**how is app packaged**
    
    - Dockerfile: Defines the Docker image configuration, including the base image, application setup, and dependencies.
    - Index.js: Contains the Node.js application code that serves "Hello World" along with an environment variable.
    - package.json: Specifies Node.js project dependencies and metadata.
    - .dockerignore: Lists files and directories to exclude from the Docker build context to optimize image creation.

#############################

**how is app deployed(underlying infrastructure)**
 
 [CLOUDFORMATION-TEMPLATE](./CloudFormation-Template/ecs.yml).

#############################

**how is deployment versioned**

    Deployment versioning in a GitHub Actions workflow triggered by a push to the main branch typically involves creating a clear and structured system for tracking and labeling each deployment. 
    Common or best practices are 
    - Semantic Versioning
    - Git Tags
    - Artifact Naming
    - Changelogs
    With these way, versioning ensures that each deployment is uniquely identifiable and traceable, aiding in effective management, monitoring, and troubleshooting of the application. 
 
#############################

**how would you connect to the deployment**
    
    After updating the Docker image in the Amazon Elastic Container Registry (ECR) via the GitHub Actions workflow, 
    the application is deployed to an Amazon Elastic Container Service (ECS) cluster. 
    Accessing the deployment is as simple as using the DNS name of the Application Load Balancer (ALB)
    Or use any domain hosted in Route53 and point the dns Name of ALB there

#############################

**add a sanity check to verify deployment worked well**

 ![SANITY-CHECK](https://github.com/Muhammad-Irfan324/ECS-Cluster-With-GithubAction/blob/main/sanity-check.png)

#############################


    Node Hello world Application

## Also suggest how the pipeline can be improved and how the app can be monitored

**Pipeline Improvements**

    - Parameterize Deployment Configuration: Instead of hardcoding values in the workflow, consider using workflow input parameters.
      This allows for flexibility when deploying to different environments or with different configurations.
    - Validation and Testing: Incorporate automated testing steps before deployment to ensure that the application works as expected.
      This can include unit tests, integration tests, and security scans.
    - Rollback Strategy: Implement a rollback strategy in case a deployment fails or causes issues.
      This could involve creating a snapshot of the current version or using blue/green deployments for ECS.
    - Notifications: Integrate notification mechanisms (e.g., Slack, email) to alert the team about the success or failure of deployments.
      GitHub Actions provides integrations for these notifications.
    - Deployment Workflow Triggers: Consider deploying only when specific conditions are met,
      such as after changes are merged into the main branch or after manual approval.

**Monitoring and Observability**

    - Logging: Configure centralized logging using tools like AWS CloudWatch Logs or an ELK Stack.
      Ensure that application logs are easily accessible and include relevant information for debugging.
    - Metrics: Instrument your application to emit relevant metrics (e.g., request latency, error rates) to a
      monitoring system like AWS CloudWatch or Prometheus. Set up dashboards to visualize these metrics.
    - Alarms and Alerts: Define alerts for critical metrics to notify your team of potential issues.
      Integrate these alerts with incident management systems for quick response.
    - Distributed Tracing: Implement distributed tracing to trace requests as they flow through your application.
      Tools like AWS X-Ray can help with this.
    - Security Scanning: Continuously scan your container images and dependencies for security vulnerabilities.
      Tools like AWS ECR Scan or third-party services can help identify and remediate vulnerabilities.
    - Deployment Health Checks: Implement health checks within your application and configure the load balancer to route
      traffic based on the health of instances. This ensures that unhealthy instances are automatically replaced.
    - Performance Monitoring: Monitor the performance of your ECS cluster, including CPU and memory utilization.
      Consider autoscaling policies to handle increased load.
    - Cost Monitoring: Use cost monitoring tools to keep an eye on AWS costs. AWS Cost Explorer and AWS Budgets
      can help you set budgets and alerts.
    - Incident Response Plan: Have a well-defined incident response plan in place to address issues promptly.
      This includes defining roles and responsibilities and practicing incident response procedures.

