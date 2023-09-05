# uses: mamezou-tech/buildpacks-action@master
#     with:
#     image: ${{ env.CONTAINER_REPOSITORY }}/${{ env.APP_NAME }}
#     tag: ${{env.IMAGE_TAG}}
#     builder: 'gcr.io/paketo-buildpacks/builder:base'
#     buildpacks: 'paketo-buildpacks/nodejs'

pack build contact-keeper-be:latest --buildpack 'gcr.io/paketo-buildpacks/nodejs:0.16' --buildpack 'paketo-buildpacks/environment-variables@4.0.1' --builder 'paketobuildpacks/builder:base' --env "BPE_TZ=Asia/Bangkok"