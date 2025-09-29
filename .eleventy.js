import Image from "@11ty/eleventy-img";

export default function (eleventyConfig) {
  // Pass through assets
  eleventyConfig.addPassthroughCopy("src/assets");

  // Image shortcode
  eleventyConfig.addNunjucksAsyncShortcode(
    "imager",
    async function (src, alt, className, sizes, loading, decoding) {
      if (!src) return "";

      let metadata = await Image(src, {
        widths: [300, 600, 1200],
        formats: ["webp", "jpeg"],
        outputDir: "./_site/img/",
        urlPath: "/img/",
      });

      let imageAttributes = {
        class: className,
        alt: alt || "",
        sizes: sizes || "100vw",
        loading: loading || "lazy",
        decoding: decoding || "async",
      };

      return Image.generateHTML(metadata, imageAttributes);
    }
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts",
      data: "_data",
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
