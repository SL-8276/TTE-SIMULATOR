export const views = [
  {
    id: 1,
    mnemonic: "Plax",
    view_name: "Parasternal Long Axis",
    category: "Parasternal",
    probe_position_image: "/assets/images/Plax.png",
    echo_video: "/assets/videos/Plax.mp4",
    probe_orientation: "Marker toward right shoulder",
    intercostal_space: "Left parasternal, typically 3rd-4th intercostal space",
    patient_position: "Left lateral decubitus",
    description:
      "Standard parasternal long-axis view showing the left ventricle, left atrium, mitral valve, aortic valve, and proximal ascending aorta.",
    structures_visible: [
      "Left ventricle",
      "Left atrium",
      "Mitral valve",
      "Aortic valve",
      "LVOT",
      "Ascending aorta"
    ],
    tags: []
  },
  {
    id: 2,
    mnemonic: "PlaxRVin",
    view_name: "Parasternal Long Axis - RV Inflow",
    category: "Parasternal",
    probe_position_image: "/assets/images/PlaxRVin.png",
    echo_video: "/assets/videos/PlaxRVin.mp4",
    probe_orientation: "From PLAX with medial/inferior tilt to RV inflow",
    intercostal_space: "Left parasternal",
    patient_position: "Left lateral decubitus",
    description:
      "Modified parasternal long-axis RV inflow view emphasizing the right atrium, tricuspid valve, and right ventricle inflow.",
    structures_visible: [
      "Right atrium",
      "Tricuspid valve",
      "Right ventricle",
      "RV inflow tract"
    ],
    tags: []
  },
  {
    id: 3,
    mnemonic: "PlaxRVout",
    view_name: "Parasternal Long Axis - RV Outflow",
    category: "Parasternal",
    probe_position_image: "/assets/images/PlaxRVout.png",
    echo_video: "/assets/videos/PlaxRVout.mp4",
    probe_orientation: "From PLAX with superior/lateral angulation to RVOT",
    intercostal_space: "Left parasternal",
    patient_position: "Left lateral decubitus",
    description:
      "Modified parasternal long-axis RV outflow view showing the right ventricular outflow tract and pulmonary valve region.",
    structures_visible: [
      "Right ventricle",
      "RVOT",
      "Pulmonary valve",
      "Main pulmonary artery"
    ],
    tags: []
  },
  {
    id: 4,
    mnemonic: "PsaxOut",
    view_name: "Parasternal Short Axis - Aortic Valve (Base)",
    category: "Parasternal",
    probe_position_image: "/assets/images/PsaxOut.png",
    echo_video: "/assets/videos/PsaxOut.mp4",
    probe_orientation: "Rotate probe 90° clockwise from PLAX",
    intercostal_space: "Left parasternal, base level",
    patient_position: "Left lateral decubitus",
    description:
      "Parasternal short-axis base view centered on the aortic valve, often showing right heart inflow/outflow relationships.",
    structures_visible: [
      "Aortic valve",
      "Tricuspid valve",
      "Right atrium",
      "RVOT",
      "Pulmonary valve"
    ],
    tags: []
  },
  {
    id: 5,
    mnemonic: "PsaxMV",
    view_name: "Parasternal Short Axis - Mitral Valve",
    category: "Parasternal",
    probe_position_image: "/assets/images/PsaxMV.png",
    echo_video: "/assets/videos/PsaxMV.mp4",
    probe_orientation: "Short-axis sweep slightly below base",
    intercostal_space: "Left parasternal",
    patient_position: "Left lateral decubitus",
    description:
      "Parasternal short-axis view at the mitral valve level, useful for assessing mitral valve morphology and LV shape.",
    structures_visible: [
      "Mitral valve",
      "Left ventricle"
    ],
    tags: []
  },
  {
    id: 6,
    mnemonic: "PsaxMid",
    view_name: "Parasternal Short Axis - Papillary Muscle",
    category: "Parasternal",
    probe_position_image: "/assets/images/PsaxMid.png",
    echo_video: "/assets/videos/PsaxMid.mp4",
    probe_orientation: "Short-axis sweep to mid-LV level",
    intercostal_space: "Left parasternal",
    patient_position: "Left lateral decubitus",
    description:
      "Mid-ventricular parasternal short-axis view showing circular LV cavity and papillary muscles.",
    structures_visible: [
      "Left ventricle",
      "Papillary muscles",
      "Interventricular septum",
      "Inferolateral wall"
    ],
    tags: []
  },
  {
    id: 7,
    mnemonic: "PsaxApex",
    view_name: "Parasternal Short Axis - Apex",
    category: "Parasternal",
    probe_position_image: "/assets/images/PsaxApex.png",
    echo_video: "/assets/videos/PsaxApex.mp4",
    probe_orientation: "Short-axis sweep toward apex",
    intercostal_space: "Left parasternal",
    patient_position: "Left lateral decubitus",
    description:
      "Parasternal short-axis apical view, showing the distal LV cavity near the apex.",
    structures_visible: [
      "Apical left ventricle",
      "LV cavity"
    ],
    tags: []
  },
  {
    id: 8,
    mnemonic: "PpaBV",
    view_name: "Parasternal SA - Pulmonary Artery Bifurcation",
    category: "Parasternal",
    probe_position_image: "/assets/images/PpaBV.png",
    echo_video: "/assets/videos/PpaBV.mp4",
    probe_orientation: "Short-axis superior sweep to pulmonary artery bifurcation",
    intercostal_space: "Left parasternal, high short-axis plane",
    patient_position: "Left lateral decubitus",
    description:
      "Parasternal short-axis plane highlighting the main pulmonary artery and its bifurcation.",
    structures_visible: [
      "Main pulmonary artery",
      "Pulmonary artery bifurcation",
      "Right pulmonary artery",
      "Left pulmonary artery"
    ],
    tags: []
  },
  {
    id: 9,
    mnemonic: "Apical4",
    view_name: "Apical 4-Chamber",
    category: "Apical",
    probe_position_image: "/assets/images/Apical4.png",
    echo_video: "/assets/videos/Apical4.mp4",
    probe_orientation: "Marker toward left side, from cardiac apex",
    intercostal_space: "Apical impulse region",
    patient_position: "Left lateral decubitus",
    description:
      "Standard apical four-chamber view showing both atria and both ventricles in one plane.",
    structures_visible: [
      "Left atrium",
      "Right atrium",
      "Left ventricle",
      "Right ventricle",
      "Mitral valve",
      "Tricuspid valve"
    ],
    tags: []
  },
  {
    id: 10,
    mnemonic: "Apical5",
    view_name: "Apical 5-Chamber",
    category: "Apical",
    probe_position_image: "/assets/images/Apical5.png",
    echo_video: "/assets/videos/Apical5.mp4",
    probe_orientation: "From Apical 4 with anterior tilt",
    intercostal_space: "Apical impulse region",
    patient_position: "Left lateral decubitus",
    description:
      "Apical five-chamber view extends the four-chamber plane to include the left ventricular outflow tract and aortic valve.",
    structures_visible: [
      "Left atrium",
      "Right atrium",
      "Left ventricle",
      "Right ventricle",
      "LVOT",
      "Aortic valve"
    ],
    tags: []
  },
  {
    id: 11,
    mnemonic: "Apical2",
    view_name: "Apical 2-Chamber",
    category: "Apical",
    probe_position_image: "/assets/images/Apical2.png",
    echo_video: "/assets/videos/Apical2.mp4",
    probe_orientation: "Rotate from Apical 4 toward 2-chamber plane",
    intercostal_space: "Apical impulse region",
    patient_position: "Left lateral decubitus",
    description:
      "Apical two-chamber view demonstrating the left atrium and left ventricle without the right-sided chambers.",
    structures_visible: [
      "Left atrium",
      "Left ventricle",
      "Anterior wall",
      "Inferior wall",
      "Mitral valve"
    ],
    tags: []
  },
  {
    id: 12,
    mnemonic: "ApicalLAX",
    view_name: "Apical Long Axis (3-Chamber)",
    category: "Apical",
    probe_position_image: "/assets/images/ApicalLAX.png",
    echo_video: "/assets/videos/ApicalLAX.mp4",
    probe_orientation: "Rotate from apical views into long-axis plane",
    intercostal_space: "Apical impulse region",
    patient_position: "Left lateral decubitus",
    description:
      "Apical long-axis view, also called 3-chamber, showing LV, LA, LVOT, and aortic valve.",
    structures_visible: [
      "Left ventricle",
      "Left atrium",
      "Mitral valve",
      "LVOT",
      "Aortic valve"
    ],
    tags: []
  },
  {
    id: 13,
    mnemonic: "Sub4",
    view_name: "Subcostal 4-Chamber",
    category: "Subcostal",
    probe_position_image: "/assets/images/Sub4.png",
    echo_video: "/assets/videos/Sub4.mp4",
    probe_orientation: "Marker toward patient left, under xiphoid",
    intercostal_space: "Subxiphoid/subcostal window",
    patient_position: "Supine",
    description:
      "Subcostal four-chamber view obtained beneath the xiphoid, useful when apical/parasternal windows are limited.",
    structures_visible: [
      "Left atrium",
      "Right atrium",
      "Left ventricle",
      "Right ventricle",
      "Interatrial septum",
      "Interventricular septum"
    ],
    tags: []
  },
  {
    id: 14,
    mnemonic: "SubOut",
    view_name: "Subcostal RV Outflow",
    category: "Subcostal",
    probe_position_image: "/assets/images/SubOut.png",
    echo_video: "/assets/videos/SubOut.mp4",
    probe_orientation: "Subcostal angulation toward RVOT",
    intercostal_space: "Subxiphoid/subcostal window",
    patient_position: "Supine",
    description:
      "Subcostal RV outflow view emphasizing the right ventricular outflow tract and pulmonary valve region.",
    structures_visible: [
      "Right ventricle",
      "RVOT",
      "Pulmonary valve",
      "Main pulmonary artery"
    ],
    tags: []
  },
  {
    id: 15,
    mnemonic: "SubMV",
    view_name: "Subcostal Short Axis - Mitral Valve",
    category: "Subcostal",
    probe_position_image: "/assets/images/SubMV.png",
    echo_video: "/assets/videos/SubMV.mp4",
    probe_orientation: "Subcostal short-axis sweep at mitral level",
    intercostal_space: "Subxiphoid/subcostal window",
    patient_position: "Supine",
    description:
      "Subcostal short-axis view at the mitral valve level.",
    structures_visible: [
      "Mitral valve",
      "Left ventricle"
    ],
    tags: []
  },
  {
    id: 16,
    mnemonic: "SubMid",
    view_name: "Subcostal Short Axis - Papillary Muscle",
    category: "Subcostal",
    probe_position_image: "/assets/images/SubMid.png",
    echo_video: "/assets/videos/SubMid.mp4",
    probe_orientation: "Subcostal short-axis mid-LV plane",
    intercostal_space: "Subxiphoid/subcostal window",
    patient_position: "Supine",
    description:
      "Subcostal short-axis view at the papillary muscle level.",
    structures_visible: [
      "Left ventricle",
      "Papillary muscles"
    ],
    tags: []
  },
  {
    id: 17,
    mnemonic: "SubApex",
    view_name: "Subcostal Short Axis - Apex",
    category: "Subcostal",
    probe_position_image: "/assets/images/SubApex.png",
    echo_video: "/assets/videos/SubApex.mp4",
    probe_orientation: "Subcostal short-axis sweep toward apex",
    intercostal_space: "Subxiphoid/subcostal window",
    patient_position: "Supine",
    description:
      "Subcostal short-axis apical view showing the distal LV cavity.",
    structures_visible: [
      "Apical left ventricle",
      "LV cavity"
    ],
    tags: []
  },
  {
    id: 18,
    mnemonic: "SubIVC",
    view_name: "Subcostal Inferior Vena Cava",
    category: "Subcostal",
    probe_position_image: "/assets/images/SubIVC.png",
    echo_video: "/assets/videos/SubIVC.mp4",
    probe_orientation: "Probe angled toward IVC from subcostal window",
    intercostal_space: "Subxiphoid/subcostal window",
    patient_position: "Supine",
    description:
      "Subcostal view of the inferior vena cava entering the right atrium, useful for volume assessment.",
    structures_visible: [
      "Inferior vena cava",
      "Right atrium",
      "Hepatic veins"
    ],
    tags: []
  },
  {
    id: 19,
    mnemonic: "SupLAX",
    view_name: "Suprasternal Long Axis (Aortic Arch)",
    category: "Suprasternal",
    probe_position_image: "/assets/images/SupLAX.png",
    echo_video: "/assets/videos/SupLAX.mp4",
    probe_orientation: "Probe in suprasternal notch toward aortic arch",
    intercostal_space: "Suprasternal notch",
    patient_position: "Supine with neck extended if tolerated",
    description:
      "Suprasternal long-axis view demonstrating the aortic arch and great vessel relationships.",
    structures_visible: [
      "Aortic arch",
      "Ascending aorta",
      "Descending aorta",
      "Arch branches"
    ],
    tags: []
  },
  {
    id: 20,
    mnemonic: "RgtPara",
    view_name: "Right Parasternal Long Axis (Ascending Aorta)",
    category: "Right Parasternal",
    probe_position_image: "/assets/images/RgtPara.png",
    echo_video: "/assets/videos/RgtPara.mp4",
    probe_orientation: "Right parasternal window toward ascending aorta",
    intercostal_space: "Right parasternal",
    patient_position: "Supine or slight left lateral",
    description:
      "Right parasternal long-axis view often used to better visualize the ascending aorta.",
    structures_visible: [
      "Ascending aorta",
      "Aortic valve",
      "LVOT"
    ],
    tags: []
  }
];