<h1>jRIAppTS framework</h1>
<b>a RIA framework for building Line of Buisiness (LOB) applications working in HTML5</b>
<br/>
This is a typescript (<a href="http://en.wikipedia.org/wiki/TypeScript" target="_blank">TypeScript</a>) version of the previous (long abandoned) <a href="https://github.com/BBGONE/jRIApp" target="_blank">jRIApp framework</a>
You can watch video of the demo on <a href="http://youtu.be/m2lxFWhJghA" target="_blank">YouTube SPA Demo</a> |
<a href="https://www.youtube.com/watch?v=bqpIARQHPhA" target="_blank">YouTube Views Transitions Animations Demo</a> |
<a href="http://youtu.be/ll_FS2iONV4" target="_blank">YouTube Folder Browser Demo</a> |
<a href="http://youtu.be/0ocvyFEs9GM" target="_blank">YouTube DataGrid column headers tooltips</a> |
<a href="http://youtu.be/Ubmt5c20sR0" target="_blank">YouTube Undoing pending changes</a>
<br/>
<p>
<b>jRIAppTS</b> – is an application framework for developing rich internet applications - RIA’s. It consists of two parts – the client and the server parts. 
The client part was written in typescript language. The server part was  written in C#  and the demo application was implemented in ASP.NET MVC (it can also be written in other languages, for example Ruby or Java, but you have to roll up your sleeves and prepare to write them). 
The Server part resembles Microsoft WCF RIA services, featuring data services which is consumed by the clients. 
The Client part resembles  Microsoft Silverlight client development, only it is based on HTML (not XAML), and uses typescript language for coding.
The framework was designed primarily for creating data centric Line of Business (LOB) applications which will work natively in browsers without the need for plugins .
The framework supports a wide range of essential features for creating LOB applications, such as, declarative use of databindings, integration with a server side dataservice, datatemplates, client side and server side data validation, localization, authorization, and a set of UI controls, 
like the datagrid, the stackpanel , the dataform and a lot of  utility code.
</p>
<p>
NOT every application meant to work in the browser is a web site. Some of them meant as a replacement for ordinal desktop applications.
Those LOB applications have a set of unique requirements which can not be fulfilled without using a strongly typed language.
Besides, those applications are mostly data centric and the databases can have a lot of data tables and stored procedures.
</p>
<p>
The framework is distinguished from other frameworks available on the market by the full stack implementation of the features required for 
developing real world  LOB applications in HTML5 without any need for pluggins.
It uses typescript language from the ground up, and because of this it benefits from typescript advantages over plain javascript: Maintainability, Modularity, Less Errors (with compiler check), Reduced development time and Readability.
Typescript also aligns with with future version of ECMAScript. 
So there won't be any need to port all the code, just recompile and that's it.
Unlike many other existing frameworks, which use MVC design pattern, the framework uses Model View View Model (MVVM) design pattern for creating applications. 
</p>
<p>
The main project here is the <b>jriappTS</b>. It is written in typescript language. 
On compilation the project produces <b>jriapp.js</b> javascript file - which is the main file of the framework.<br/>
<i>P.S.- some of the modules in the framework are optional and you can compile the project without them if you decide that they are not needed 
or you want to replace them with your own ones. Read the UserGuide.pdf for the details.</i><br/> 
The <b>RIAppDemo</b> is the demo project which uses this framework and it also includes server side components of this framework - The Data Service.<br/> 
The <b>NancySelfHost</b> is another demo project which shows how to use the jriappTS framework with NancyFX framework (http://nancyfx.org/) in self hosting environment.<br/>
The <b>demoTS</b> and <b>spaAMD</b> are two typescript projects which contain code for client side part of the demo projects (the <i>RIAppDemo</i> and the <i>NancySelfHost</i>). 
On compilation those project produce a set of javascript files which are referenced in the demo projects HTML pages 
</p>
<p>
Using the data service you can generate strongly typed client side domain model in typescript language.
See the demoTS project for the example. (the DEMODB.ts file contains the generated code.)
The documentation explains how you can use the framework in more details.
</p>
The minified <b>jriapp.js</b> file has the size of about 320 KB. and when it is gzipped, it is about 70 KB.<br/><br/>
<p>
<i>Disclaimer: Don't judge too much the inline use of css styles in the Demo html pages. They are not relevant for the framework's
workings. You can use bad pattern or good pattern and the framework does not care about it, because it is separate from the HTML on the page. 
I used them in the demos as a quick and ready way of the HTML markup for testing purposes.<br/>
I use this framework at my work and it works perfectly for LOB applications.
But if you use it, then use it at your own risk.
</i>
</p>
<br/>
<b>Latest changes:</b>
<p>2015-09-26 Code refactory - to diminish code dependency between core modules.</p>  
<p>2015-09-24 Better calculated fields definitions. Functions for calculated fields now have a strongly typed entity item.
Previously access to the current item was using untyped 'this' variable. Server side data service was also updated. 
Previously written code works without changes. But the new features provide better type safety.<br/>
example of previous usage of defining a calculated field for a dbSet:
<br/>
<pre>
	dbSets.TMessageAttachment.defineFileNameField(function () {
			return this.IsBodyPart? this.BodyText:this.FileName;
		});
</pre>
<br/>
and current usage:
<pre>
	dbSets.TMessageAttachment.defineFileNameField(function (item) {
			return item.IsBodyPart? item.BodyText:item.FileName;
		});
</pre>
</p>
--
Maxim V. Tsapov<br/> 
<a href="https://plus.google.com/u/0/+MaximT/posts" target="_blank">I'm on Google+</a>