# Example
# image: 'afs-warehouse-frontend'
# tag: '0.0.1-SNAPSHOT'
# path: 'dist'
# builder: 'gcr.io/paketo-buildpacks/builder:base'
# buildpacks: 'paketo-buildpacks/nginx paketo-community/staticfile'
npm run build

cp ./buildpack.yml ./build/

pack build contact-keeper-fe:latest --path './build' \
--buildpack 'gcr.io/paketo-buildpacks/nginx:0.7' \
--buildpack 'paketo-community/staticfile' \
--builder 'paketobuildpacks/builder:base'