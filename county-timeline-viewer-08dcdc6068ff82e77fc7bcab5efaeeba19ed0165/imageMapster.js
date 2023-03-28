
let image = $('#wpa_clickmap');

// build area data from areas

let areas = $.map($('area[alt]'), function (el) {
    return {
        key: $(el).attr('county'),
        toolTip: $(el).attr('alt')
    };
});

function copySelectionsToHiddenField() {
    $('#selectedKeys').val(image.mapster('get'));
}


image.mapster({
    fillOpacity: 0.3,
    fillColor: "d62828",
    stroke: true,
    strokeColor: "000000",
    strokeWidth: 3,
    mapKey: 'county',
    showToolTip: true,
    singleSelect: true,

    areas: areas,
    clickNavigate: true,
    onStateChange: function (e) {
        if (e.state === 'select') {
            copySelectionsToHiddenField();
        }
    }
});





