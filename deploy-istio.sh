ISTIO_PATH=/Users/isara/Documents/DEV/tools/istio-1.17.1/bin
BUILD=Y # Y or N - Y to also build frontend and backend

# SHOW CURRENT K8S CLUSTER
kubectl cluster-info
# PROMPT FOR CONFIRMATION
read -p "Is cluster correct? Y to continue " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "Operation cancel"
    exit 1
fi 

# INSTALL INSTIO AND ENABLE SIDECAR INJECTION ON DEFAULT NAMESPACE
$ISTIO_PATH/istioctl install --set profile=demo -y
kubectl label namespace default istio-injection=enabled


# INSTALL BACKEND
if [[ "$BUILD" =~ ^([yY][eE][sS]|[yY])$ ]]
then
    pushd backend
    pwd
    ./docker-build.sh
    popd
fi
kubectl apply -f ./backend/k8s/local-deployment.yaml

# INSTALL FRONTEND
if [[ "$BUILD" =~ ^([yY][eE][sS]|[yY])$ ]]
then
    pushd frontend
    pwd
    ./buildpack-nginx.sh
    popd
fi
kubectl apply -f ./frontend/k8s/local-deployment.yaml

# INSTALL ISTIO GATEWAY
kubectl apply -f ./istio/gateway.yaml

# SANITY CHECK
$ISTIO_PATH/istioctl analyze

# HELP TEXT
echo ""
echo "   __________  __  _______  __    __________________"
echo "  / ____/ __ \/  |/  / __ \/ /   / ____/_  __/ ____/"
echo " / /   / / / / /|_/ / /_/ / /   / __/   / / / __/   "
echo "/ /___/ /_/ / /  / / ____/ /___/ /___  / / / /___   "
echo "\____/\____/_/  /_/_/   /_____/_____/ /_/ /_____/   "
echo ""
echo ""
                                                    
echo "for k8s on docker desktop"
echo "open browser to http://localhost/contact-keeper/"
echo "login with..."
echo "user: test@test.com"
echo "pass: Passwd@1"
echo ".... hope it works :)"