export const useGetHomescreenImages = () => {
  // @ts-ignore
  const context = require.context("public/homescreen-carousel", false);

  const keys = context.keys();
  return keys.map((key: string) => {
    const fileName = key.slice(key.lastIndexOf("/") + 1);

    return {
      src: "homescreen-carousel" + "/" + fileName,
      alt: fileName
    };
  });
};

//TODO: test this somehow