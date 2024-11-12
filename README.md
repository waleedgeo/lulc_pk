# Urbanization-led Land Cover Change Impacts Terrestrial Carbon Storage Capacity: A High-Resolution Remote Sensing-Based Nationwide Assessment in Pakistan (1990–2020)

## Overview

This repository contains the code, resources, and datasets for our study:

**[Urbanization-led land cover change impacts terrestrial carbon storage capacity: A high-resolution remote sensing-based nation-wide assessment in Pakistan (1990–2020)](https://doi.org/10.1016/j.eiar.2023.107396)**, published in *Environmental Impact Assessment Review*.

### Dataset Availability

We are excited to announce that our comprehensive **Pakistan 30m Land Use Land Cover (LULC) and Carbon Storage Dataset (1990–2020)** is now open-sourced. This dataset covers four time periods: **1990, 2000, 2010, and 2020**, providing valuable insights into land cover transformations and carbon storage dynamics over three decades.

- **Zenodo Archive**: [Zenodo Dataset](https://zenodo.org/records/13982339)
- **Earth Engine Assets**: See [Earth Engine Access](#earth-engine-access)

### Citation

If you find this work useful, please consider citing our paper:

```bibtex
@article{waleed2024_paklulc,
  title={Urbanization-led land cover change impacts terrestrial carbon storage capacity: A high-resolution remote sensing-based nation-wide assessment in Pakistan (1990–2020)},
  author={Waleed, Mirza and Sajjad, Muhammad and Shazil, Muhammad Shareef},
  journal={Environmental Impact Assessment Review},
  volume={105},
  pages={107396},
  year={2024},
  publisher={Elsevier}
}
```

- **Paper DOI**: [https://doi.org/10.1016/j.eiar.2023.107396](https://doi.org/10.1016/j.eiar.2023.107396)
- **Paper PDF**: [Download PDF](https://waleedgeo.com/papers/waleed2024_paklulc.pdf)

---

## Dataset Description

This dataset provides high-resolution, nationwide **Land Use/Land Cover (LULC)** and **terrestrial carbon stock** maps of Pakistan for four epochs: **1990, 2000, 2010, and 2020**. Developed using multi-sensor satellite imagery and advanced classification techniques within **Google Earth Engine (GEE)**, the dataset offers a detailed analysis of land cover changes driven by urbanization and their impacts on carbon storage capacity over 30 years.

### Key Features

- **Spatial Resolution**: 30 meters
- **Temporal Coverage**: 1990, 2000, 2010, 2020
- **LULC Classes**: Nine distinct land cover types (see [LULC Classification Table](#lulc-classification-table))
- **Carbon Pools**: Above-ground biomass, below-ground biomass, soil organic carbon, and dead organic matter
- **Methodology**: Hybrid random forest-based machine learning approach with ~40,000 stratified random samples for training and validation
- **Applications**: Urban planning, climate change mitigation, environmental management, policy-making

### Findings

- **Urban Expansion**: Urban areas in Pakistan expanded by over **1040%** between 1990 and 2020
- **Carbon Storage Loss**: Approximately **5% decrease** in terrestrial carbon storage capacity
- **Regional Variations**:
  - Major cities like **Karachi** and **Lahore** showed moderate urban sprawl
  - Emerging cities like **Rawalpindi** and **Peshawar** experienced rapid expansion
- **Land Conversion**: Significant shift from rangelands (~47%) and agricultural lands (~35%) to built-up areas
- **Afforestation Efforts**: Positive impact in northern regions, but significant north-south disparities in carbon loss

---

## Web Applications

Interactive **Google Earth Engine (GEE)** applications are available to explore the datasets.

### Land Use Land Cover (LULC) Viewer

- **Access App**: [Pakistan LULC Viewer (1990–2020)](https://waleedgis.users.earthengine.app/view/pakistan-lulc-1990-2020)
- **Features**:
  - Select province and district
  - Visualize LULC for 1990, 2000, 2010, and 2020
- **Preview**:

  ![LULC App Demo](https://imgur.com/azb1v8H.gif)

### Carbon Storage Viewer

- **Access App**: [Pakistan Carbon Storage Viewer (1990–2020)](https://waleedgis.users.earthengine.app/view/pakistan-carbon-1990-2020)
- **Features**:
  - Select province and district
  - Visualize carbon storage for 1990, 2000, 2010, and 2020
- **Preview**:

  ![Carbon Storage App Demo](https://imgur.com/MLKKDcV.gif)

---

## Earth Engine Access

The datasets are also available as Earth Engine assets for direct use within the GEE platform.

### Earth Engine Snippet

```javascript
// LULC Images
var lulc1990 = ee.Image('projects/pak-var/assets/lulc_pk/img1990');
var lulc2000 = ee.Image('projects/pak-var/assets/lulc_pk/img2000');
var lulc2010 = ee.Image('projects/pak-var/assets/lulc_pk/img2010');
var lulc2020 = ee.Image('projects/pak-var/assets/lulc_pk/img2020');

// Carbon Stock Images (values multiplied by 10 for scaling)
var carbon1990 = ee.Image('projects/pak-var/assets/carbon_pk/img1990').multiply(10);
var carbon2000 = ee.Image('projects/pak-var/assets/carbon_pk/img2000').multiply(10);
var carbon2010 = ee.Image('projects/pak-var/assets/carbon_pk/img2010').multiply(10);
var carbon2020 = ee.Image('projects/pak-var/assets/carbon_pk/img2020').multiply(10);
```

- **Sample Code**: [Earth Engine Code Editor](https://code.earthengine.google.com/0b5a71516494fbac2148398af5db7475)

### Note

We have uploaded the dataset to the **Google Earth Engine** platform and have submitted a request to include it in the **Awesome Community Datasets Catalogue**. The request is currently pending approval, and we will update this repository once the dataset is officially included.

---

## LULC Classification Table

| LULC Class           | Class Value | Color Code  | Visual                                    |
|----------------------|-------------|-------------|-------------------------------------------|
| Forest Cover         | 1           | `#54bb19`   | ![#54bb19](https://via.placeholder.com/15/54bb19/000000?text=+) |
| Agriculture/Cropland | 3           | `#affd08`   | ![#affd08](https://via.placeholder.com/15/affd08/000000?text=+) |
| Rangeland            | 4           | `#d1fbb9`   | ![#d1fbb9](https://via.placeholder.com/15/d1fbb9/000000?text=+) |
| Wetlands             | 5           | `#652ff3`   | ![#652ff3](https://via.placeholder.com/15/652ff3/000000?text=+) |
| Barren Lands         | 6           | `#fed483`   | ![#fed483](https://via.placeholder.com/15/fed483/000000?text=+) |
| Water Bodies         | 7           | `#005ce6`   | ![#005ce6](https://via.placeholder.com/15/005ce6/000000?text=+) |
| Built-up Areas       | 8           | `#e50600`   | ![#e50600](https://via.placeholder.com/15/e50600/000000?text=+) |
| Snow/Ice             | 9           | `#fe4fcd`   | ![#fe4fcd](https://via.placeholder.com/15/fe4fcd/000000?text=+) |

---

## Contact

For any queries or collaboration opportunities, please contact:

- **Mirza Waleed**
  - **Email**: [waleedgeo@outlook.com](mailto:waleedgeo@outlook.com)
  - **LinkedIn**: [linkedin.com/in/waleedgeo](https://www.linkedin.com/in/waleedgeo)
  - **Website**: [waleedgeo.com](https://waleedgeo.com)

---

## Additional Resources

- **Research Projects and Opportunities**: [UrbES Lab](https://www.researchgate.net/lab/UrbES-Urban-Environmental-Systems-Lab-Muhammad-Sajjad-PhD)
- **Contributors**:
  - [Dr. Muhammad Sajjad](https://geog.hkbu.edu.hk/people/detail/680/)
  - [Muhammad Shareef Shazil](https://www.linkedin.com/in/shazil-qureshi-60a624246/)

---

## License

This project is licensed under the **Creative Commons Attribution 4.0 International License**.

[![License: CC BY 4.0](https://licensebuttons.net/l/by/4.0/88x31.png)](http://creativecommons.org/licenses/by/4.0/)

---

## Keywords

`land use land cover`, `Pakistan`, `LULC`, `carbon`, `urbanization`, `Google Earth Engine`, `geospatial`, `remote sensing`, `GIS`

---

**Note**: To bulk download these datasets, please visit our [Zenodo Archive](https://zenodo.org/records/13982339).

---
