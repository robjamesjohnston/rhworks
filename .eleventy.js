const Image = require('@11ty/eleventy-img');
const path = require('path');
const htmlmin = require('html-minifier');
const CleanCSS = require('clean-css');
const { minify } = require('terser');

module.exports = function (eleventyConfig) {
  eleventyConfig.addNunjucksAsyncShortcode('responsiveImage', async function (src, alt, sizes, lazy = '') {
    let metadata = await Image('./src/img/' + src, {
      widths: [500, 1000, 1500, 2000, null],
      outputDir: './output/img/',
      sharpWebpOptions: { quality: 50 },
      sharpJpegOptions: { quality: 50 },
      filenameFormat: function (id, src, width, format, options) {
        const extension = path.extname(src);
        const name = path.basename(src, extension);
        return `${id}-${name}-${width}w.${format}`;
      },
    });
    let lowsrc = metadata.jpeg[0];
    return `<picture>
    ${Object.values(metadata)
      .map((imageFormat) => {
        return `  <source type="${imageFormat[0].sourceType}" ${lazy}srcset="${imageFormat
          .map((entry) => entry.srcset)
          .join(', ')}" sizes="${sizes}">`;
      })
      .join('\n')}
      <img
        ${lazy}src="${lowsrc.url}"
        width="${lowsrc.width}"
        height="${lowsrc.height}"
        alt="${alt}"
      >
    </picture>`;
    // loading="lazy"
    // decoding="async"
  });

  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (outputPath.endsWith('.html')) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }
    return content;
  });

  eleventyConfig.addFilter('cssmin', function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addNunjucksAsyncFilter('jsmin', async function (code, callback) {
    try {
      const minified = await minify(code);
      callback(null, minified.code);
    } catch (err) {
      console.error('Terser error: ', err);
      callback(null, code);
    }
  });

  eleventyConfig.addCollection('system', (collection) => {
    const system = collection.getFilteredByTag('system').sort((a, b) => {
      return Number(b.data.order) - Number(a.data.order);
    });
    return system;
  });

  eleventyConfig.addCollection('projects', (collection) => {
    const livePosts = (post) => !post.data.draft;
    const projects = collection.getFilteredByGlob('src/projects/*.md').filter(livePosts).sort((a, b) => {
      return Number(b.data.order) - Number(a.data.order);
    });
    return projects;
  });

  eleventyConfig.addFilter('getFirstCollectionItem', (collection) => collection[0]);
  eleventyConfig.addFilter('getLastCollectionItem', (collection) => collection[collection.length - 1]);

  eleventyConfig.addPassthroughCopy('src/assets');

  return {
    dir: {
      input: 'src',
      output: 'output',
    },
    dataTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  };
};
