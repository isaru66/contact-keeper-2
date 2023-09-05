# GENERATE TEMPLATE OUTPUT
helm template ./contact-keeper --output-dir output --dry-run --debug


# DEPLOY TEMPLATE ON NAME SPACE
KUBERNETES_NAMESPACE=isaru66-contact-keeper
MICROSERVICE_FE_NAME=contact-keeper-fe
MICROSERVICE_BE_NAME=contact-keeper-be
kubectl apply -f output/contact-keeper/templates/contact-keeper-be.yaml -n ${KUBERNETES_NAMESPACE}
kubectl apply -f output/contact-keeper/templates/contact-keeper-fe.yaml -n ${KUBERNETES_NAMESPACE}
# kubectl rollout status deployment ${MICROSERVICE_FE_NAME} -n ${KUBERNETES_NAMESPACE}
# kubectl rollout status deployment ${MICROSERVICE_BE_NAME} -n ${KUBERNETES_NAMESPACE}