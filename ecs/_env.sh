function get_output() {
    local _stack=$1
    local _key=$2
    echo "$_stack" | jq -r ".Stacks[0].Outputs[] | select(.OutputKey == \"$_key\") | .OutputValue"
}

export AWS_REGION="ap-northeast-1"
stack_desc=$(aws cloudformation describe-stacks --stack-name "EcsSampleStack")

export SUBNET_1=$(get_output "$stack_desc" "Subnet1Output")
export SUBNET_2=$(get_output "$stack_desc" "Subnet2Output")
export SECURITY_GROUP_ID=$(get_output "$stack_desc" "SecurityGroupIdOutput")
export CLUSTER_NAME=$(get_output "$stack_desc" "AppClusterNameOutput")
export TASK_ROLE_ARN=$(get_output "$stack_desc" "EcsTaskRoleOutput")
export EXECUTION_ROLE_ARN=$(get_output "$stack_desc" "EcsTaskExecutionRoleOutput")

# ecspresso deploy --config config.yml --tasks 0 --skip-task-definition
# ecspresso --config config.yml delete
# ecspresso --config config.yml deploy
# ecspresso --config config.yml create
