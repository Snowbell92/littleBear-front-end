# Require any additional compass plugins here.

#Folder settings
http_path = '/'
relative_assets = false     
css_dir = "css"          
sass_dir = "sass"           
images_dir = "images"   
javascripts_dir = 'js'

# You can select your preferred output style here (can be overridden via the command line):
output_style = :expanded # After dev :compressed

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = false

# Obviously
preferred_syntax = :scss

# Enable sourcemap in everything but production

sourcemap = (environment == :production) ? false : true