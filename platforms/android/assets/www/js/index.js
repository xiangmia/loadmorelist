/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var position = 0;
var isLoading = false;
var loader = {
    loadMoreData: function() {
        if (isLoading)
            return;
        isLoading = true;
        // var url = 'data/' + position + '.json';
        var url = 'http://www.whatsbeef.net/wabz/guide.php?start=' + position;
        console.log("url " + url);
        $.getJSON(url).pipe(function(data) {
            isLoading = false;
            var items = [];
            $.each(data.results, function(index, item) {
                var li = '<li><h3>';
                li = li + (position + index + 1) + '. ' + item.channel + '</h3><h3>' + item.name + '</h3><h2>'
                li = li + item.start_time + ' - ' + item.end_time
                li = li + '</h2><div class="ui-li-aside"><h1>' + item.rating + '</h1></div>'
                items.push(li);
            });
            $('#list').append(items.join(''));
            console.log(items.join('\n'));
            $('#list').listview("refresh");
            position = position + items.length;
            $('#itemCount').text("" + position);
        });
    }
};

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        loader.loadMoreData();
    }
};

