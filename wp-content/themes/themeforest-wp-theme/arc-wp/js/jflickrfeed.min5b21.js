/*
* Copyright (C) 2009 Joel Sutherland
* Licenced under the MIT license
* https://www.newmediacampaigns.com/page/jquery-flickr-plugin
*
* Available tags for templates:
* title, link, date_taken, description, published, author, author_id, tags, image*
*/
(function($){$.fn.jflickrfeed=function(settings,callback){settings=$.extend(true,{flickrbase:'https://api.flickr.com/services/feeds/',feedapi:'photos_public.gne',limit:20,qstrings:{lang:'en-us',format:'json',jsoncallback:'?'},cleanDescription:true,useTemplate:true,itemTemplate:'',itemCallback:function(){}},settings);var url=settings.flickrbase+settings.feedapi+'?';var first=true;for(var key in settings.qstrings){if(!first)
url+='&';url+=key+'='+settings.qstrings[key];first=false;}
return $(this).each(function(){var $container=$(this);var container=this;$.getJSON(url,function(data){$.each(data.items,function(i,item){if(i<settings.limit){if(settings.cleanDescription){var regex=/<p>(.*?)<\/p>/g;var input=item.description;if(regex.test(input)){item.description=input.match(regex)[2]
if(item.description!=undefined)
item.description=item.description.replace('<p>','').replace('</p>','');}}
item['image_s']=item.media.m.replace('_m','_s');item['image_t']=item.media.m.replace('_m','_t');item['image_m']=item.media.m.replace('_m','_m');item['image']=item.media.m.replace('_m','');item['image_b']=item.media.m.replace('_m','_b');delete item.media;if(settings.useTemplate){var template=settings.itemTemplate;for(var key in item){var rgx=new RegExp('{{'+key+'}}','g');template=template.replace(rgx,item[key]);}
$container.append(template)}
settings.itemCallback.call(container, item);
}
}); if ($.isFunction(callback)) { callback.call(container, data); }
});
});
}
})(jQuery);
