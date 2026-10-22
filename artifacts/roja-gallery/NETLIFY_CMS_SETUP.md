# Publish and manage Roja's gallery

The public portfolio is a static site. The `/admin/` editor writes gallery
changes and uploaded image files to the connected GitHub repository; Netlify
then rebuilds the site from those commits.

## One-time setup

1. Push this project to a GitHub repository and connect that repository to a
   Netlify site. The root `netlify.toml` already sets the build command and
   publish directory.
2. The repository is already set to
   `pooyaaghazadeh-create/Rojaphotogallery` in
   `artifacts/roja-gallery/public/admin/config.yml`. The CMS file and upload
   paths are relative to the repository root. Set `branch` to the branch Netlify
   publishes if it is not `main`.
3. Register a GitHub OAuth app at
   [github.com/settings/developers](https://github.com/settings/developers):
   - Set its homepage URL to the Netlify site's URL.
   - Set its authorization callback URL to `https://api.netlify.com/auth/done`.
   - Copy the Client ID and generate a Client Secret. Keep the secret private;
     enter it only in Netlify.
4. In Netlify, open the gallery site and go to **Project configuration →
   Security → OAuth**. Under **Authentication Providers**, choose **Install
   Provider → GitHub**, enter the Client ID and Client Secret, and save.
5. Commit the config change and let Netlify deploy. Open
   `https://YOUR-SITE/admin/` and sign in with the authorized GitHub account.
   Roja's GitHub account must have permission to push to the content repository.

See the official setup guides for
[Netlify OAuth providers](https://docs.netlify.com/manage/security/secure-access-to-sites/oauth-provider-tokens/)
and the [Decap CMS GitHub backend](https://decapcms.org/docs/github-backend/).

## Updating photos and albums

In the editor, open **Gallery → Portfolio content**. Roja can add or remove
albums, upload cover and gallery images, edit photo titles and captions, then
save. Each save becomes a GitHub commit; Netlify publishes the update after its
build completes.

Use a unique, lowercase URL slug for each album. Existing demo images are
generated examples, not Roja's photographs; replace them through the image
fields before presenting the gallery as her portfolio.
