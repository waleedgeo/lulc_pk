var ic = ee.ImageCollection("projects/pak-var/assets/lulc_pk");

var list_ic = ic.toList(6)

print(list_ic)

var img1 = ee.Image(list_ic.get(0))
var img2 = ee.Image(list_ic.get(3))

print(img1)
var urban1990 = img1.eq(8).selfMask().rename('urban1990')
var urban2020 = img2.eq(8).selfMask().rename('urban2020')


Map.addLayer(urban1990, {palette: 'red'}, 'urban1990')
Map.addLayer(urban2020, {palette: 'blue'}, 'urban2020')


var change = urban2020.subtract(urban1990)

Map.addLayer(change, {palette: 'green'}, 'change')