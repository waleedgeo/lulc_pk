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

var lulc_colors = ['#54bb19', '#ffffff','#affd08', '#d1fbb9', '#652ff3', '#fed483', '#005ce6', '#e50600', '#fe4fcd']
var lulcvis = {
    min: 1,
    max: 9,
    palette: lulc_colors
}


// importing land cover data
var img1990 = ee.Image('projects/pak-var/assets/lulc_pk/img1990')
var img2000 = ee.Image('projects/pak-var/assets/lulc_pk/img2000')
var img2010 = ee.Image('projects/pak-var/assets/lulc_pk/img2010')
var img2020 = ee.Image('projects/pak-var/assets/lulc_pk/img2020')


// importing shapefile
var province = ee.FeatureCollection('projects/pak-var/assets/pak_adm2')
var province_list = province.aggregate_array('ADM1_EN').distinct()

province_list.evaluate(function (provlist) {
  panel.province.items().reset(provlist)
})

Map.addLayer(img1990, lulcvis, 'PK LULC 1990', false)
Map.addLayer(img2000, lulcvis, 'PK LULC 2000', false)
Map.addLayer(img2010, lulcvis, 'PK LULC 2010', false)
Map.addLayer(img2020, lulcvis, 'PK LULC 2020', false)



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
      value: 'LULC Dynamics in Pakistan (1990-2020)',
      style: styleH1
  }),
  sec_panel:ui.Label({
    value:'District Level Assessment',
    style:{
      fontWeight: 'bold',
      fontSize: '14px',
      margin: '5px 5px 5px 5px',
      padding: '0px 0px 0px 0px',
      color: 'blue'
    }
  }),
  sub_title: ui.Label({
      value: 'Select your Province/district and see the LULC rasters and total area for each class.',
      style: styleP
  }),
  provider: ui.Label({
      value: 'Cite :',
      style: styleH2
  }),
  source: ui.Label({
      value: 'Paper Currently under review!!!',
      style: styleP
  }).setUrl('http://waleedgeo.com'),
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
      value: 'District Name :',
      style: styleP
  }),
  district: ui.Select({
      placeholder: 'Select District',
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

          var urban1990 = aoi_img1990.eq(8)
          
          var change_img = aoi_img2020.subtract(aoi_img1990)``



          Map.addLayer(aoi_img1990, lulcvis, aoi_name + ' LULC 1990', false)
          Map.addLayer(aoi_img2000, lulcvis, aoi_name + ' LULC 2000', false)
          Map.addLayer(aoi_img2010, lulcvis, aoi_name + ' LULC 2010', false)
          Map.addLayer(aoi_img2020, lulcvis, aoi_name + ' LULC 2020', false)
          
          var nullImage = ee.Image().byte();
          var district_outline = nullImage.paint({
              featureCollection: layer,
              width: 1.5
          });

          // Download command

          // Create sub-panel to accomodate buttons
          var button_panel1 = ui.Panel({
            layout: ui.Panel.Layout.flow('horizontal', true),
            style:{width: '100%'}});
          var button_panel2 = ui.Panel({
            layout: ui.Panel.Layout.flow('horizontal', true),
            style:{width: '100%'}});
          
          // Add button and link to download flood shapefile
          var shp_label = ui.Label('Download link', {shown: false});
          var shp_download_button = ui.Button({
            label: 'LULC Download',
            onClick: function(){
              // Extract the link for the shapefile
              var flood_image = aoi_img1990;
              var vector_url = flood_image.getDownloadURL('ZIPPED_GEO_TIFF');

              shp_label.setUrl(vector_url);
              shp_label.style().set({shown: true});
            }});
          
          button_panel1.add(shp_download_button);
          button_panel2.add(shp_label);
// area 1990

            var area1990img = ee.Image.pixelArea().addBands(aoi_img1990)
            var areas1990 = area1990img.reduceRegion({
                    reducer: ee.Reducer.sum().group({
                        groupField: 1,
                        groupName: 'class',
                    }),
                    geometry: layer.geometry(),
                    scale: 30,
                    maxPixels: 1e10
                })
            var classAreas1990 = ee.List(areas1990.get('groups'))
              var classAreaLists1990 = classAreas1990.map(function(item) {
                var areaDict = ee.Dictionary(item)
                var classNumber = ee.Number(areaDict.get('class')).format()
                var area = ee.Number(
                  areaDict.get('sum')).divide(1e6).round()
                return ee.List([classNumber, area])
              })
          
            var area1990 = ee.Dictionary(classAreaLists1990.flatten())  

// area 2000

            var area2000img = ee.Image.pixelArea().addBands(aoi_img2000)
            var areas2000 = area2000img.reduceRegion({
                    reducer: ee.Reducer.sum().group({
                        groupField: 1,
                        groupName: 'class',
                    }),
                    geometry: layer.geometry(),
                    scale: 30,
                    maxPixels: 1e10
                })
            var classAreas2000 = ee.List(areas2000.get('groups'))
            
              var classAreaLists2000 = classAreas2000.map(function(item) {
                var areaDict = ee.Dictionary(item)
                var classNumber = ee.Number(areaDict.get('class')).format()
                var area = ee.Number(
                  areaDict.get('sum')).divide(1e6).round()
                return ee.List([classNumber, area])
              })
          
            var area2000 = ee.Dictionary(classAreaLists2000.flatten())  
          


// area 2010


            var area2010img = ee.Image.pixelArea().addBands(aoi_img2010)
            var areas2010 = area2010img.reduceRegion({
                    reducer: ee.Reducer.sum().group({
                        groupField: 1,
                        groupName: 'class',
                    }),
                    geometry: layer.geometry(),
                    scale: 30,
                    maxPixels: 1e10
                })
            var classAreas2010 = ee.List(areas2010.get('groups'))
            
              var classAreaLists2010 = classAreas2010.map(function(item) {
                var areaDict = ee.Dictionary(item)
                var classNumber = ee.Number(areaDict.get('class')).format()
                var area = ee.Number(
                  areaDict.get('sum')).divide(1e6).round()
                return ee.List([classNumber, area])
              })
          
            var area2010 = ee.Dictionary(classAreaLists2010.flatten())  

// area 2020


            var area2020img = ee.Image.pixelArea().addBands(aoi_img2020)
            var areas2020 = area2020img.reduceRegion({
                    reducer: ee.Reducer.sum().group({
                        groupField: 1,
                        groupName: 'class',
                    }),
                    geometry: layer.geometry(),
                    scale: 30,
                    maxPixels: 1e10
                })
            var classAreas2020 = ee.List(areas2020.get('groups'))
            
              var classAreaLists2020 = classAreas2020.map(function(item) {
                var areaDict = ee.Dictionary(item)
                var classNumber = ee.Number(areaDict.get('class')).format()
                var area = ee.Number(
                  areaDict.get('sum')).divide(1e6).round()
                return ee.List([classNumber, area])
              })
            
            var area2020 = ee.Dictionary(classAreaLists2020.flatten())  

          var chartPanel = ui.Panel({
              style: {
                  margin: '0px 0px 0px 0px',
                  position: 'bottom-right',
                  padding: '1px 1px',
                  width: '280px'
              }
          })

          var chart = ui.Chart.array.values({
                  array: area1990.values(),
                  axis: 0,
                  xLabels: area1990.keys(),
              }).setChartType('ComboChart')
              .setOptions({
                  title: 'Year: 1990',
                  series: {0: {type: 'bars'}, 1: {type: 'line'}},
                  colors: ['black'],
                  hAxis: {
                      title: 'LULC Class',
                      format: '####',
                      textStyle: {
                          fontSize: 8
                      }
                  },
                  vAxis: {
                      title: 'Area (SqKm)',
                      textStyle: {
                          fontSize: 8
                      }
                  },
                  legend: {
                      position: "none"
                  },
                  lineWidth: 0.5,
                  pointSize: 1,
                  style: {
                      shown: true
                  }
              });


          var chart2 = ui.Chart.array.values({
                array: area2000.values(),
                axis: 0,
                xLabels: area2000.keys(),
            }).setChartType('ComboChart')
            .setOptions({
                title: 'Year: 2000',
                series: {0: {type: 'bars'}, 1: {type: 'line'}},
                colors: ['black'],
                hAxis: {
                    title: 'LULC Class',
                    format: '####',
                    textStyle: {
                        fontSize: 8
                    }
                },
                vAxis: {
                    title: 'Area (SqKm)',
                    textStyle: {
                        fontSize: 8
                    }
                },
                legend: {
                    position: "none"
                },
                lineWidth: 0.5,
                pointSize: 1,
                style: {
                    shown: true
                }
            });

          var chart3 = ui.Chart.array.values({
                array: area2010.values(),
                axis: 0,
                xLabels: area2010.keys(),
            }).setChartType('ComboChart')
            .setOptions({
                title: 'Year: 2010',
                series: {0: {type: 'bars'}, 1: {type: 'line'}},
                colors: ['black'],
                hAxis: {
                    title: 'LULC Class',
                    format: '####',
                    textStyle: {
                        fontSize: 8
                    }
                },
                vAxis: {
                    title: 'Area (SqKm)',
                    textStyle: {
                        fontSize: 8
                    }
                },
                legend: {
                    position: "none"
                },
                lineWidth: 0.5,
                pointSize: 1,
                style: {
                    shown: true
                }
            });

          var chart4 = ui.Chart.array.values({
                array: area2020.values(),
                axis: 0,
                xLabels: area2020.keys(),
            }).setChartType('ComboChart')
            .setOptions({
                title: 'Year: 2020',
                series: {0: {type: 'bars'}, 1: {type: 'line'}},
                colors: ['black'],
                hAxis: {
                    title: 'LULC Class',
                    format: '####',
                    textStyle: {
                        fontSize: 8
                    }
                },
                vAxis: {
                    title: 'Area (SqKm)',
                    textStyle: {
                        fontSize: 8
                    }
                },
                legend: {
                    position: "none"
                },
                lineWidth: 0.5,
                pointSize: 1,
                style: {
                    shown: true
                }
            });
          Map.remove(chartPanel)
          chartPanel.add(button_panel1)
          chartPanel.add(button_panel2)
          chartPanel.add(chart)
          chartPanel.add(chart2)
          chartPanel.add(chart3)
          chartPanel.add(chart4)
          //Map.add(chartPanel)
          ui.root.add(chartPanel)

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

var panel_fill = ui.Panel({
  widgets: [
      panel.title,
      panel.sec_panel,
      panel.sub_title,
      panel.provider,
      panel.source,
      panel.area_list,
      panel.pro,
      panel.province,
      panel.dis,
      panel.district,
      panel.loading,
      panel.legend_title,
      ui.Panel([
          ui.Label({
              style: {
                  backgroundColor: lulc_colors[0],
                  padding: '8px',
                  margin: '0 10px 10px 10px'
              }
          }),
          ui.Label({
              value: 'Forest Cover (1)',
              style: {
                  fontSize: '12px',
                  margin: '0px'
              }
          })
      ], ui.Panel.Layout.Flow('horizontal')),
      ui.Panel([
          ui.Label({
              style: {
                  backgroundColor: lulc_colors[2],
                  padding: '8px',
                  margin: '0 10px 10px 10px'
              }
          }),
          ui.Label({
              value: 'Agriculture (3)',
              style: {
                  fontSize: '12px',
                  margin: '0px'
              }
          })
      ], ui.Panel.Layout.Flow('horizontal')),
      ui.Panel([
          ui.Label({
              style: {
                  backgroundColor: lulc_colors[3],
                  padding: '8px',
                  margin: '0 10px 10px 10px'
              }
          }),
          ui.Label({
              value: 'Rangeland (4)',
              style: {
                  fontSize: '12px',
                  margin: '0px'
              }
          })
      ], ui.Panel.Layout.Flow('horizontal')),
      ui.Panel([
        ui.Label({
            style: {
                backgroundColor: lulc_colors[4],
                padding: '8px',
                margin: '0 10px 10px 10px'
            }
        }),
        ui.Label({
            value: 'Wetlands (5)',
            style: {
                fontSize: '12px',
                margin: '0px'
            }
        })
    ], ui.Panel.Layout.Flow('horizontal')),
      ui.Panel([
        ui.Label({
            style: {
                backgroundColor: lulc_colors[5],
                padding: '8px',
                margin: '0 10px 10px 10px'
            }
        }),
        ui.Label({
            value: 'Barren (6)',
            style: {
                fontSize: '12px',
                margin: '0px'
            }
        })
    ], ui.Panel.Layout.Flow('horizontal')),
      ui.Panel([
        ui.Label({
            style: {
                backgroundColor: lulc_colors[6],
                padding: '8px',
                margin: '0 10px 10px 10px'
            }
        }),
        ui.Label({
            value: 'Water Bodies (7)',
            style: {
                fontSize: '12px',
                margin: '0px'
            }
        })
    ], ui.Panel.Layout.Flow('horizontal')),
      ui.Panel([
        ui.Label({
            style: {
                backgroundColor: lulc_colors[7],
                padding: '8px',
                margin: '0 10px 10px 10px'
            }
        }),
        ui.Label({
            value: 'Builtup (8)',
            style: {
                fontSize: '12px',
                margin: '0px'
            }
        })
    ], ui.Panel.Layout.Flow('horizontal')),
      ui.Panel([
        ui.Label({
            style: {
                backgroundColor: lulc_colors[8],
                padding: '8px',
                margin: '0 10px 10px 10px'
            }
        }),
        ui.Label({
            value: 'Snow Cover (9)',
            style: {
                fontSize: '12px',
                margin: '0px'
            }
        })
    ], ui.Panel.Layout.Flow('horizontal')),
      ui.Label('About :', styleH2),
      ui.Label({value:'Author : Mirza Waleed', style:{fontSize:'12px',margin:'3px 5px'}}),
      ui.Label({value:'Email : waleedgeo@outlook.com', style:{fontSize:'12px',margin:'3px 5px'}}),
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
