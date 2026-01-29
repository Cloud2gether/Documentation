aws sso login --profile c2g-devops

Cloud Formation 

#Pipeline
aws --region us-east-1 --profile c2g-devops cloudformation create-stack --stack-name DocsWebSite-Pipeline --template-body file://devops/pipeline-stack.yaml --capabilities CAPABILITY_AUTO_EXPAND

aws  --region us-east-1 --profile c2g-devops cloudformation update-stack --stack-name DocsWebSite-Pipeline --template-body file://devops/pipeline-stack.yaml --capabilities CAPABILITY_AUTO_EXPAND


aws  --region us-east-1 --profile c2g-devops cloudformation delete-stack --stack-name WebSite-Pipeline


aws --region us-east-1 --profile c2g-dev cloudformation update-stack --stack-name DocsWebSite --template-body file://cloudformation-stack.yaml --parameters ParameterKey=Environment,ParameterValue=dev ParameterKey=CertificateId,ParameterValue=4d873980-5fcc-447b-b8d3-b18a8f91fa58 --capabilities CAPABILITY_NAMED_IAM



