const el = document.getElementById('api_list');
const request = 'https://api.coingecko.com/api/v3/coins/list?include_platform=false';

const Web_Caches = {
    data: 'coin_list_v1'
};

async function getCoinList(){
    var cache = await caches.open( Web_Caches.data );
    
    return cache.match( request ).then( function( response ) {
    
        console.log( request, response );

        if( response ){
            return response.json();
        } else {
            console.log( "code ran " );
            var errorMsg = document.getElementById("cache_text");
            errorMsg.innerHTML = "No cache found ... cache created";

            return fetch( request ).then( function( response ) {
                console.log( "debug: fetching list");

                console.log( response );
                cache.put( request , response.clone() );

                return response.json();
            });
        };
    });

}

function start() {
    return getCoinList();
}

(async() => {
    console.log('before start');
  
    output = await start();
    
    console.log( output.length );

    for (var i = 0; i < output.length; i++) {
        const newDiv = document.createElement("div");

        newDiv.innerHTML = "<h5>" + output[i].name + "<span> ( " + output[i].symbol +" ) </span></h5>"
        newDiv.id = output[i].id;
        newDiv.classList.add("coin");

        el.appendChild(newDiv);
    }

    console.log('after start');
  })();
