**PREREQUISITE**
    
    Before running the cloudformation Template upload the docker image to ECR  
    As we'll be passing the Image URI in this template
For instructions on pushing the Docker image to ECR, please refer to the [ECR Image Upload Guide](../readme.md).

#############################

**Parameters Passed in this Template**
    
    - VpcCIDR
    - PublicAZ1
    - PublicAZ2
    - PrivateAZ
    - AZ1
    - AZ2
    - ECRImageURI
    Two Public Subnet requirement for ALB 

#############################

**Steps Performed by CloudFormation Template**

    - Create VPC
    - 2 Public Subnet and one Private Subnet
    - Internet Gateway Created and Added in Public Route Table 
    - Public Subnet Assoication with Public Route Table 
    - NatGateway Created in first public subnet with elastic IP
    - Private Route table created and NAT gateway added in it for internet traffic 
    - private subnet association with private route table
    - Role with policy ARN for ECS task execution role and ECR readonly 
    - ECS task definition with container from ECR 
    - ECS and ALB security Group
    - ECS Cluster
    - ALB and Target Group and attach ALB securty group
    - ALB listener added target group
    - ECS service in private subnet with fargate and ECS security group
    - Output ALB DNS Name

#############################

**Screenshots for template run** 

  ![Resources](https://github.com/Muhammad-Irfan324/ECS-Cluster-With-GithubAction/blob/main/CloudFormation-Template/Selection_999(260).png)    

#############################

  ![Output](https://github.com/Muhammad-Irfan324/ECS-Cluster-With-GithubAction/blob/main/CloudFormation-Template/Selection_999(261).png)

#############################

  ![Parameters](https://github.com/Muhammad-Irfan324/ECS-Cluster-With-GithubAction/blob/main/CloudFormation-Template/Selection_999(262).png)

#############################

  ![DNS-Name](https://github.com/Muhammad-Irfan324/ECS-Cluster-With-GithubAction/blob/main/CloudFormation-Template/Selection_999(263).png)
