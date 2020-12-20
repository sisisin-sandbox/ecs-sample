import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';
import * as iam from '@aws-cdk/aws-iam';

export class EcsSampleStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'VPC', {
      cidr: '10.0.0.0/16',
      subnetConfiguration: [{ cidrMask: 24, name: 'Public', subnetType: ec2.SubnetType.PUBLIC }],
    });

    const cluster = new ecs.Cluster(this, 'Cluster', {
      vpc: vpc,
      clusterName: 'Cluster',
    });
    const ecsTaskRole = new iam.Role(this, 'EcsTaskRole', {
      roleName: 'EcsTaskRole',
      assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
    });
    const executionRole = new iam.Role(this, 'EcsTaskExecutionRole', {
      roleName: 'EcsTaskExecutionRole',
      assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
      managedPolicies: [
        {
          managedPolicyArn: 'arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy',
        },
      ],
    });
    const securityGroup = new ec2.SecurityGroup(this, 'SecurityGroup', { vpc });

    new cdk.CfnOutput(this, 'Subnet1Output', { value: vpc.publicSubnets[0].subnetId });
    new cdk.CfnOutput(this, 'Subnet2Output', { value: vpc.publicSubnets[1].subnetId });
    new cdk.CfnOutput(this, 'SecurityGroupIdOutput', { value: securityGroup.securityGroupId });
    new cdk.CfnOutput(this, 'AppClusterNameOutput', { value: cluster.clusterName });
    new cdk.CfnOutput(this, 'EcsTaskRoleOutput', { value: ecsTaskRole.roleArn });
    new cdk.CfnOutput(this, 'EcsTaskExecutionRoleOutput', { value: executionRole.roleArn });
  }
}
