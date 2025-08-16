# frozen_string_literal: true
source "https://rubygems.org"

# Use GitHub’s supported Jekyll + plugins set
gem "github-pages", group: :jekyll_plugins

# Theme
gem "jekyll-theme-chirpy", "~> 7.3"

# Local development extras
gem "webrick", "~> 1.8"   # Needed for Ruby >= 3.0 local serve

group :test do
  gem "html-proofer", "~> 5.0"
end

# Windows-specific
platforms :mingw, :x64_mingw, :mswin do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
  gem "wdm", "~> 0.2.0"
end
