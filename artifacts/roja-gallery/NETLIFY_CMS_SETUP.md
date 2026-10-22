# Publish and manage Roja's gallery

The public portfolio is a static site. The `/admin/` editor writes gallery
changes and uploaded image files to the connected GitHub repository; Netlify
then rebuilds the site from those commits.

## One-time setup

1. Push this project to a GitHub repository and connect that repository to a
   Netlify site. The root `netlify.toml` already sets the build command and
   publish directory.
2. The repository is already set to
   `pooyaaghazadeh-create/Rojaphotogalley` in `public/admin/config.yml`. Set
   `branch` to the branch Netlify publishes if it is not `main`.
3. In Netlify's authentication-provider settings, enable GitHub authentication
   for the site. Decap CMS uses Netlify's GitHub authentication endpoint; see
   [Decap's GitHub backend guide](https://decapcms.org/docs/github-backend/).
   Roja's GitHub account must have permission to push to the content repository.
4. Commit the config change and let Netlify deploy. Open `https://YOUR-SITE/admin/`
   and sign in with the authorized GitHub account.

## Updating photos and albums

In the editor, open **Gallery → Portfolio content**. Roja can add or remove
albums, upload cover and gallery images, edit photo titles and captions, then
save. Each save becomes a GitHub commit; Netlify publishes the update after its
build completes.

Use a unique, lowercase URL slug for each album. Existing demo images are
generated examples, not Roja's photographs; replace them through the image
fields before presenting the gallery as her portfolio.
