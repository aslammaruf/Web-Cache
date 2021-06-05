var el_coininfo = document.getElementById('coin_info');
// const request = "/coininfo.json";
var request = "https://api.coingecko.com/api/v3/coins/dogecoin?tickers=false&market_data=true&community_data=true&developer_data=true&sparkline=false";

var current = new Date();
var refreshcache = 1 * 60000

var Web_Caches = {
    data: 'coin_list_v1'
};

async function getCoinList(){
    var cache = await caches.open( Web_Caches.data );
    
    return cache.match( request ).then( function( response ) {
    
        console.log( request, response );

        if( response ){
            for(var key of response.headers.keys() ) {
                console.log(key);
            }
            
            var timediff = current - new Date(response.headers.get("expires"))
            console.log( response.headers.get("expires") )
            console.log( timediff / 60000 )

            if( timediff > refreshcache) {
                return getApi( cache )
            }

            return response.json();
        } else {
            console.log( "code ran " );
            var errorMsg = document.getElementById("cache_text");
            errorMsg.innerHTML = "No cache found ... cache created";

            return getApi()
        };
    });

}

function getApi( cache ) {
    return fetch( request ).then( function( response ) {
        console.log( "debug: fetching list");

        console.log( response );
        cache.put( request , response.clone() );

        return response;
    });
}

function start() {
    return getCoinList();
}

(async() => {
    console.log('get_coin: before start');
  
    output = await start();
    
    el_coininfo.innerHTML = "Dogecoin: last updated " + output.last_updated

    console.log('get_coin: after start');
  })();
