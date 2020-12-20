# ecs-sample

## How to deploy ecs

```bash
export AWS_PROFILE=ecs-sample # setup your aws credential
cd cloudformation
npm i
npm run deploy
cd ../ecs
. ./_env.sh
ecspresso --config config.yml create # or `deploy`
```

## How to get Stack description

```bash
aws cloudformation describe-stacks --stack-name "EcsSampleStack"
```

[example outputs](./describe-stack-result-sample.json)
