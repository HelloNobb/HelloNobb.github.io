import anime from "animejs/lib/anime.es.js";

export const sectionDisplay = (sectionSelector) => {
  //console.log(document.querySelector(sectionSelector));
  anime({
    targets: sectionSelector,
    translateY: [100, 0],
    opacity: [0, 1],
    easing: "easeOutQuint",
    autoplay: true,
  });
};

export const figureRelay = (layoutSelector) => {
  const figureLayout = document.querySelector(layoutSelector);
  const figures = figureLayout.childNodes;

  var tl = anime.timeline({
    duration: 300,
  });

  for (let i = 0; i < figures.length; i++) {
    tl.add({
      targets: `${layoutSelector} > div:nth-child(${i + 1})`,
      translateY: [100, 0],
      opacity: [0, 1],
      delay: i === 0 ? 300 : 0,
    });
  }
};

export const pathDisplay = (pathSelector, paths) => {
  var attr = {
    d: "",
  };
  anime({
    targets: attr,
    d: paths,
    delay: 300,
    update: () => {
      document.querySelector(pathSelector).setAttribute("d", attr.d);
    },
  });
};

export const display = (objectSelector) => {
  anime({
    targets: objectSelector,
    opacity: [0, 1],
    easing: "easeOutQuint",
    delay: 300,
  });
};
