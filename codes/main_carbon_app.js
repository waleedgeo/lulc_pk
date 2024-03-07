/*
Generate readme description

# Carbon Storage Capacity in Pakistan (1990-2020)

A

*/

var mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]
Map.setOptions('mapStyle', {mapStyle: mapStyle});



// functions

// vis param

var palette = ["#440154","#481467","#482576","#453781","#404688","#39558c","#33638d","#2d718e","#287d8e","#238a8d","#1f968b","#20a386","#29af7f","#3dbc74","#56c667","#75d054","#95d840","#bade28","#dde318","#fde725"]
var vis = {
  min: 0,
  max: 31.1,
  palette: palette
}


// importing carbon data (note multiply each image to 10 if you want values result documented in paper)
var img1990 = ee.Image('projects/pak-var/assets/carbon_pk/img1990').multiply(10)
var img2000 = ee.Image('projects/pak-var/assets/carbon_pk/img2000').multiply(10)
var img2010 = ee.Image('projects/pak-var/assets/carbon_pk/img2010').multiply(10)
var img2020 = ee.Image('projects/pak-var/assets/carbon_pk/img2020').multiply(10)


// importing shapefile
var province = ee.FeatureCollection('projects/pak-var/assets/pak_adm2')
var province_list = province.aggregate_array('ADM1_EN').distinct()

province_list.evaluate(function (provlist) {
panel.province.items().reset(provlist)
})

Map.addLayer(img1990, vis, 'Carbon 1990', false)
Map.addLayer(img2000, vis, 'Carbon 2000', false)
Map.addLayer(img2010, vis, 'Carbon 2010', false)
Map.addLayer(img2020, vis, 'Carbon 2020', true)




/*
#################################################
Styles for the UI elements

*/

var styleBox = {
  padding: '0px 0px 0px 0px',
  width: '250px',
}

var styleH1 = {
  fontWeight: 'bold',
  fontSize: '18px',
  margin: '5px 5px 5px 5px',
  padding: '0px 0px 0px 0px',
  color: 'black'
}

var styleH2 = {
  fontWeight: 'bold',
  fontSize: '14px',
  margin: '5px 5px',
  // padding: '0px 15px 0px 0px',
  color: 'black'
}

var styleP = {
  fontSize: '12px',
  margin: '5px 5px',
  padding: '0px 0px 0px 0px'
}


/*
#################################################
Panel for the UI elements

*/

var panel = {
title: ui.Label({
    value: 'Carbon Storage Capacity in Pakistan (1990-2020)',
    style: styleH1
}),
sec_panel:ui.Label({
  value:'Division Level Assessment',
  style:{
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '5px 5px 5px 5px',
    padding: '0px 0px 0px 0px',
    color: 'blue'
  }
}),
sub_title: ui.Label({
    value: 'Note: Select your Province/division and see the carbon rasters.',
    style: styleP
}),
provider: ui.Label({
    value: 'Cite :',
    style: styleH2
}),
source: ui.Label({
    value: 'Waleed, M., Sajjad, M., & Shazil, M. S. (2024). Urbanization-led land cover change impacts terrestrial carbon storage capacity: A high-resolution remote sensing-based nation-wide assessment in Pakistan (1990–2020). Environmental Impact Assessment Review, 105, 107396.',
    style: styleP
}).setUrl('https://doi.org/10.1016/j.eiar.2023.107396'),
paperlink: ui.Label({
    value: 'Click here to see the published paper',
    style: styleP
}).setUrl('https://doi.org/10.1016/j.eiar.2023.107396'),
area_list: ui.Label({
    value: 'Select your area :',
    style: styleH2
}),
pro: ui.Label({
    value: 'Province Name :',
    style: styleP
}),
province: ui.Select({
    placeholder: 'Select Province',
    style: styleBox,
    onChange: function (a) {
        panel.loading.style().set({
            shown: false
        })
        panel.district.set({
            disabled: false
        })
        var filter = province.filterMetadata('ADM1_EN', 'equals', a)
        filter.aggregate_array('ADM2_EN').evaluate(function (list) {
            panel.district.items().reset(list)
        })
    }
}),
dis: ui.Label({
    value: 'Division Name :',
    style: styleP
}),
district: ui.Select({
    placeholder: 'Select Division',
    style: styleBox,
    disabled: true,
    onChange: function () {
        Map.clear()

        var layer = province.filterMetadata('ADM2_EN', 'equals', panel.district.getValue())

        var aoi_name = panel.district.getValue()

        var aoi_img1990 = img1990.clip(layer)
        var aoi_img2000 = img2000.clip(layer)
        var aoi_img2010 = img2010.clip(layer)
        var aoi_img2020 = img2020.clip(layer)

        Map.addLayer(aoi_img1990, vis, aoi_name + ' Carbon 1990', false)
        Map.addLayer(aoi_img2000, vis, aoi_name + ' Carbon 2000', false)
        Map.addLayer(aoi_img2010, vis, aoi_name + ' Carbon 2010', false)
        Map.addLayer(aoi_img2020, vis, aoi_name + ' Carbon 2020', true)
        
        var nullImage = ee.Image().byte();
        var district_outline = nullImage.paint({
            featureCollection: layer,
            width: 1.5
        });


        Map.addLayer(district_outline, {
            palette: 'black'
        }, panel.district.getValue() + ' Boundary')
        Map.setOptions('mapStyle', {mapStyle: mapStyle});
        Map.centerObject(layer)
    }
}),
loading: ui.Label({
    value: 'Waiting for the district area is selected.....',
    style: {
        shown: true,
        color: 'grey',
        fontSize: '12px'
    }
}),
legend_title: ui.Label({
    value: 'Legend :',
    style: {
        fontWeight: 'bold',
        fontSize: '14px',
        margin: '5px 5px 8px 5px',
        // padding: '0px 15px 0px 0px',
        color: 'black'
    }
}),

}

// Creates a color bar thumbnail image for use in legend from the given color palette
function makeColorBarParams(palette) {
return {
  bbox: [0, 0, 1, 0.1],
  dimensions: '100x10',
  format: 'png',
  min: 0,
  max: 1,
  palette: palette,
};
}

// Create the colour bar for the legend
var colorBar = ui.Thumbnail({
image: ee.Image.pixelLonLat().select(0),
params: makeColorBarParams(vis.palette),
style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});

// Create a panel with three numbers for the legend
var legendLabels = ui.Panel({
widgets: [
  ui.Label(vis.min, {margin: '4px 8px'}),
  ui.Label(
      ((vis.max-vis.min) / 2+vis.min),
      {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
  ui.Label(vis.max, {margin: '4px 8px'})
],
layout: ui.Panel.Layout.flow('horizontal')
});

// Legend title
var legendTitle = ui.Label({
value: 'Carbon Storage (Mg/m2)',
style: {fontWeight: 'bold'}
});

// Add the legendPanel to the map
//var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);

var panel_fill = ui.Panel({
widgets: [
    panel.title,
    panel.provider,
    panel.source,
    panel.paperlink,
    panel.sec_panel,
    panel.sub_title,
    
    panel.area_list,
    panel.pro,
    panel.province,
    panel.dis,
    panel.district,
    panel.loading,
    panel.legend_title,
    legendTitle, colorBar, legendLabels,
    ui.Label('About :', styleH2),
    ui.Label({value:'App Created By : Mirza Waleed', style:{fontSize:'12px',margin:'3px 5px'}}),
    ui.Label({value:'Email : waleedgeo@outlook.com', style:{fontSize:'12px',margin:'3px 5px'}}).setUrl('https://mailto:waleedgeo@outlook.com'),
    ui.Label({value:'Website: waleedgeo.com', style:{fontSize:'12px',margin:'3px 5px'}}).setUrl('https://waleedgeo.com'),
    ui.Label({value:'LinkedIn: WaleedGeo', style:{fontSize:'12px',margin:'3px 5px'}}).setUrl('https://www.linkedin.com/in/waleedgeo'),
],
style: {
    margin: '12px',
    position: 'bottom-right',
    width: '320px'
},

})

Map.setCenter(70.704, 30.655, 5)
ui.root.add(panel_fill)
