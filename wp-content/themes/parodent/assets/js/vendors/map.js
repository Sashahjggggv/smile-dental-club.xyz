jQuery(function ($) {

    var maps = [],
        mapStyles = [{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"simplified"},{"color":"#e94f3f"}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"on"},{"gamma":"0.50"},{"hue":"#ff4a00"},{"lightness":"-79"},{"saturation":"-86"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"hue":"#ff1700"}]},{"featureType":"landscape.natural.landcover","elementType":"all","stylers":[{"visibility":"on"},{"hue":"#ff0000"}]},{"featureType":"poi","elementType":"all","stylers":[{"color":"#e74231"},{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"color":"#4d6447"},{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"color":"#f0ce41"},{"visibility":"off"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"color":"#363f42"}]},{"featureType":"road","elementType":"all","stylers":[{"color":"#231f20"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#6c5e53"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#313639"},{"visibility":"off"}]},{"featureType":"transit","elementType":"labels.text","stylers":[{"hue":"#ff0000"}]},{"featureType":"transit","elementType":"labels.text.fill","stylers":[{"visibility":"simplified"},{"hue":"#ff0000"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#0e171d"}]}],
        ibOptions = {
                    alignBottom: true,
                    content: 'text',
                    // pixelOffset: new google.maps.Size(25, -45),
                    pixelOffset: ($(window).width() < 768) ? new google.maps.Size(-150, -60) : new google.maps.Size(-180, -60),
                    boxStyle: {
                            width: "360px"
                    },
                    closeBoxMargin: "0",
                    closeBoxURL: ajax_security['theme_uri'] + '/assets/img/icons/btn-close.svg',
                    infoBoxClearance: new google.maps.Size(1, 1)
            },
            ib = new InfoBox(ibOptions);

    function Map(id, mapOptions) {
            this.map = new google.maps.Map(document.getElementById(id), mapOptions);
            this.markers = [];
            this.infowindows = [];
    }

    function addMarker(mapId, location, index, string, image) {
            maps[mapId].markers[index] = new google.maps.Marker({
                    position: location,
                    map: maps[mapId].map,
                    icon: {
                            url: image
                    }
            });

            var content = '<div class="info-box">' + string + '</div>';

            google.maps.event.addListener(maps[mapId].markers[index], 'click', function () {
                    ib.setContent(content);
                    ib.setPosition(location);
                    ib.open(maps[mapId].map);
            });

    }

    function initialize(mapInst) {

        var lat = mapInst.attr("data-lat"),
                lng = mapInst.attr("data-lng"),
                myLatlng = new google.maps.LatLng(lat, lng),
                setZoom = parseInt(mapInst.attr("data-zoom")),
                mapId = mapInst.attr('id');

            //console.log(clusterImg);

        var mapOptions = {
                zoom: setZoom,
                disableDefaultUI: true,
                scrollwheel: false,
                zoomControl: true,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.LARGE,
                    position: google.maps.ControlPosition.RIGHT_BOTTOM
                },
                streetViewControl: false,
                streetViewControlOptions: {
                    position: google.maps.ControlPosition.LEFT_BOTTOM
                },
                fullscreenControl: false,
                center: myLatlng,
                styles: mapStyles
        };

        maps[mapId] = new Map(mapId, mapOptions);

        $('.marker[data-rel="' + mapId + '"]').each(function (i, el) {
                addMarker(
                        mapId,
                        new google.maps.LatLng(
                                $(this).attr('data-lat'),
                                $(this).attr('data-lng')
                        ),
                        i,
                        $(this).attr('data-string'),
                        $(this).attr('data-image')
                );
        });

        maps[mapId].map.addListener('click', function() {
                ib.close();
        });

        // $('.info-box .btn-close').on('click', function(){
        //     ib.close();
        // })

        // var closeInfoBox = document.querySelector(".info-box .btn-close");
        // google.maps.event.addDomListener(closeInfoBox, 'click', function(){
        //     ib.close();
        // });



    }

    $('.map').each(function () {
            initialize($(this));			
    });

});