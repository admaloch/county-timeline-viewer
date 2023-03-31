
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
    scaleMap: true,
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

$('area.highlighted').mapster('set', true);

// updates highlighted area on map based on change of county value
export const updateHighlightedCounty = (county) => {
    $(".highlighted").css("display", "none");
    $("#wpa_map area").removeClass("highlighted");
    document.querySelectorAll('area').forEach(x => {
        if (x.alt.split(' ')[0].toLowerCase() === county.toLowerCase()) {
            x.classList.add('highlighted')
            $('area.highlighted').mapster('set', true);
        }
    })

}

// $('img').mapster('resize', 800, null, 1000);

// window.addEventListener('resize', () => {
//     // Toggle on mobile
//     if (window.innerWidth >= 996) {
//         $('img').mapster('resize', 800, null, 100);
//     }

// });
// window.addEventListener('resize', () => {
//     // Toggle on mobile
//     if (window.innerWidth < 996) {
//         $('img').mapster('resize', 400, null, 100);
//     }

// });

function resize() {

    if ($(window).width() < 992) {
        $('img').mapster('resize', 500, null);
    }

    else {
        $('img').mapster('resize', 800, null);
    }
}
$(window).on("resize", resize);
resize(); // call once initially

function resize2() {

    if ($(window).width() < 500) {
        $('img').mapster('resize', 325, null);
    }

}
$(window).on("resize", resize2);
resize2(); // call once initially