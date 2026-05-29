export const excludedTrainingViewIds = [8, 15, 17, 20];

export const trainingViewOverrides = {
  1: {
    image: "/assets/training/images/PlaxEcho.png",
    video: "/assets/training/videos/plax.mp4",
    hotspots: [
      { id: "plax-dta", label: "DTA", x: 56.74, y: 77.51 },
      { id: "plax-rv", label: "RV", x: 52.5, y: 29.73 },
      { id: "plax-av", label: "AV", x: 55.92, y: 46.08 },
      { id: "plax-lv", label: "LV", x: 40.97, y: 47.44 },
      { id: "plax-la", label: "LA", x: 55.2, y: 62.99 },
      { id: "plax-aorta", label: "Aorta", x: 64.14, y: 44.79 },
      { id: "plax-mv", label: "MV", x: 47.41, y: 60.3 }
    ]
  },
  2: {
    image: "/assets/training/images/PlaxRVinEcho.png",
    video: "/assets/training/videos/PlaxRVin.mp4",
    hotspots: [
      { id: "plax-rvin-rv", label: "RV", x: 55.42, y: 31.3 },
      { id: "plax-rvin-ivc", label: "IVC", x: 71.95, y: 48.65 },
      { id: "plax-rvin-tv", label: "TV", x: 56.96, y: 51.98 },
      { id: "plax-rvin-ra", label: "RA", x: 62.55, y: 61.55 },
      { id: "plax-rvin-svc", label: "SVC", x: 57.85, y: 82.23 }
    ]
  },
  3: {
    image: "/assets/training/images/PlaxRVoutEcho.png",
    video: "/assets/training/videos/PlaxRVout.mp4",
    hotspots: [
      { id: "plax-rvout-pv", label: "PV", x: 55.98, y: 35.61 },
      { id: "plax-rvout-pa", label: "PA", x: 60.98, y: 47.07 },
      { id: "plax-rvout-rv", label: "RV", x: 50.4, y: 29.55 }
    ]
  },
  4: {
    image: "/assets/training/images/PsaxOutEcho.png",
    video: "/assets/training/videos/PsaxOut.mp4",
    hotspots: [
      { id: "psax-out-aorta", label: "Aorta", x: 90.8, y: 26.41 },
      { id: "psax-out-ias", label: "IAS", x: 41.67, y: 57.99 },
      { id: "psax-out-pa", label: "PA", x: 61.33, y: 44.78 },
      { id: "psax-out-pv", label: "PV", x: 60.22, y: 38.93 },
      { id: "psax-out-tv", label: "TV", x: 40.9, y: 38.93 },
      { id: "psax-out-rv", label: "RV", x: 47.43, y: 28.16 },
      { id: "psax-out-ra", label: "RA", x: 39.07, y: 47.48 },
      { id: "psax-out-la", label: "LA", x: 48.2, y: 63.5 },
      { id: "psax-out-av", label: "AV", x: 50.7, y: 47.35 }
    ]
  },
  5: {
    image: "/assets/training/images/PsaxMVEcho.png",
    video: "/assets/training/videos/PsaxMV.mp4",
    hotspots: [
      { id: "psax-mv-rv", label: "RV", x: 44.96, y: 32.71 },
      { id: "psax-mv-pml", label: "PML", x: 52.56, y: 63.48 },
      { id: "psax-mv-aml", label: "AML", x: 51.5, y: 48.09 }
    ]
  },
  6: {
    image: "/assets/training/images/PsaxMidEcho.png",
    video: "/assets/training/videos/PsaxMid.mp4",
    hotspots: [
      { id: "psax-mid-pmpm", label: "PMPM", x: 49.66, y: 57.18 },
      { id: "psax-mid-alpm", label: "ALPM", x: 58.17, y: 49.4 },
      { id: "psax-mid-lv", label: "LV", x: 53.32, y: 43.55 },
      { id: "psax-mid-rv", label: "RV", x: 48.46, y: 26.41 }
    ]
  },
  7: {
    image: "/assets/training/images/PsaxApexEcho.png",
    video: "/assets/training/videos/PsaxApex.mp4",
    hotspots: [
      { id: "psax-apex-rv", label: "RV", x: 49.96, y: 27.35 },
      { id: "psax-apex-lv", label: "LV", x: 54.82, y: 40.85 }
    ]
  },
  9: {
    image: "/assets/training/images/Apical4Echo.png",
    video: "/assets/training/videos/Apical4.mp4",
    hotspots: [
      { id: "apical4-tv", label: "TV", x: 46.63, y: 70.59 },
      { id: "apical4-mv", label: "MV", x: 61.2, y: 61.36 },
      { id: "apical4-ra", label: "RA", x: 50.33, y: 78.37 },
      { id: "apical4-la", label: "LA", x: 59.03, y: 75.38 },
      { id: "apical4-lv", label: "LV", x: 56.34, y: 34.22 },
      { id: "apical4-rv", label: "RV", x: 46.63, y: 49.27 },
      { id: "apical4-lpv", label: "L PV", x: 55.19, y: 86.14 },
      { id: "apical4-rpv", label: "R PV", x: 69.42, y: 66.75 }
    ]
  },
  10: {
    image: "/assets/training/images/Apical5Echo.png",
    video: "/assets/training/videos/Apical5.mp4",
    hotspots: [
      { id: "apical5-aorta", label: "Aorta", x: 50.85, y: 74.41 },
      { id: "apical5-av", label: "AV", x: 52.48, y: 67.77 },
      { id: "apical5-ra", label: "RA", x: 42.1, y: 59.61 },
      { id: "apical5-rv", label: "RV", x: 44.52, y: 32.78 },
      { id: "apical5-lv", label: "LV", x: 52.48, y: 27.39 }
    ]
  },
  11: {
    image: "/assets/training/images/Apical2Echo.png",
    video: "/assets/training/videos/Apical2.mp4",
    hotspots: [
      { id: "apical2-mv", label: "MV", x: 57.78, y: 64.65 },
      { id: "apical2-la", label: "LA", x: 59.52, y: 78.16 },
      { id: "apical2-lv", label: "LV", x: 56.2, y: 40.21 },
      { id: "apical2-aw", label: "AW", x: 62.64, y: 33.45 },
      { id: "apical2-iw", label: "IW", x: 48.07, y: 40.21 }
    ]
  },
  12: {
    image: "/assets/training/images/ApicalLAXEcho.png",
    video: "/assets/training/videos/ApicalLAX.mp4",
    hotspots: [
      { id: "apicallax-rvot", label: "RVOT", x: 67.71, y: 37.81 },
      { id: "apicallax-av", label: "AV", x: 67.71, y: 53.58 },
      { id: "apicallax-aorta", label: "Aorta", x: 72.04, y: 55.29 },
      { id: "apicallax-la", label: "LA", x: 65.89, y: 66.79 },
      { id: "apicallax-lv", label: "LV", x: 51.46, y: 28.41 },
      { id: "apicallax-mv", label: "MV", x: 60.12, y: 57.99 },
      { id: "apicallax-ilw", label: "ILW", x: 45.65, y: 40.51 },
      { id: "apicallax-asw", label: "ASW", x: 61.18, y: 34.52 }
    ]
  },
  13: {
    image: "/assets/training/images/Sub4Echo.png",
    video: "/assets/training/videos/Sub4.mp4",
    hotspots: [
      { id: "sub4-tv", label: "TV", x: 49.72, y: 42.09 },
      { id: "sub4-mv", label: "MV", x: 55.83, y: 54.05 },
      { id: "sub4-ra", label: "RA", x: 47.22, y: 48.37 },
      { id: "sub4-la", label: "LA", x: 50.97, y: 59.52 },
      { id: "sub4-lv", label: "LV", x: 59.24, y: 46.87 },
      { id: "sub4-rv", label: "RV", x: 52.12, y: 38.16 }
    ]
  },
  14: {
    image: "/assets/training/images/SubOutEcho.png",
    video: "/assets/training/videos/SubOut.mp4",
    hotspots: [
      { id: "subout-ra", label: "RA", x: 59.96, y: 52.87 },
      { id: "subout-la", label: "LA", x: 65.42, y: 65.75 },
      { id: "subout-av", label: "AV", x: 65.85, y: 55.25 },
      { id: "subout-pa", label: "PA", x: 71.74, y: 56.25 },
      { id: "subout-rv", label: "RV", x: 64.82, y: 41.17 }
    ]
  },
  16: {
    image: "/assets/training/images/SubMidEcho.png",
    video: "/assets/training/videos/SubMid.mp4",
    hotspots: [
      { id: "submid-rv", label: "RV", x: 67.32, y: 35.45 },
      { id: "submid-lv", label: "LV", x: 66.03, y: 53.8 }
    ]
  },
  18: {
    image: "/assets/training/images/SubIVCEcho.png",
    video: "/assets/training/videos/SubIVC.mp4",
    hotspots: [
      { id: "subivc-ra", label: "RA", x: 54.53, y: 56.59 },
      { id: "subivc-ivc", label: "IVC", x: 40.16, y: 53.41 },
      { id: "subivc-hv", label: "HV", x: 44.43, y: 43.29 }
    ]
  },
  19: {
    image: "/assets/training/images/SupLAXEcho.png",
    video: "/assets/training/videos/SupLAX.mp4",
    hotspots: [
      { id: "suplax-lcc", label: "LCC", x: 60.03, y: 28.24 },
      { id: "suplax-lsca", label: "LSCA", x: 61.73, y: 38.74 },
      { id: "suplax-dta", label: "DTA", x: 60.03, y: 57.74 },
      { id: "suplax-arch", label: "Arch", x: 53.44, y: 35.74 }
    ]
  }
};
