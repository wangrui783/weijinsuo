/*
* 自己写的js脚本
* @Author: Administrator
* @Date:   2016-08-13 19:48:47
* @Last Modified by:   Administrator
* @Last Modified time: 2016-08-19 23:07:37
*/

'use strict';
$(function(){
	// 根据屏幕的变化决定屏幕应该展示什么
	function resize(){
		//当文档加载完成后执行的函数
		//获取屏幕宽度
		var windowWidth=$(window).width();

		//判断屏幕属于大还是小
		var isSmallScreen= windowWidth < 768;
		
		//根据大小为界面上的每一张图设置轮播图
		$("#carousel-example-generic > .carousel-inner> .item").each(function(i, item) {
			var $item=$(item);//因为拿到的是dom对象，需要转换
		//console.log( $item);
		//$item.data()是一个函数,专门用于取元素上的自定义属性(data-xxx)
		//函数的参数是我们要取得属性名称(abc)
			 var imgSrc =isSmallScreen ? $item.data('image-xs') : $item.data('image-lg');
			//设置背景图片
			 $item.css('backgroundImage','url("'+imgSrc+'")');
			// 因为我们需要小图时，尺寸等比例变化,所以小图时使用img标签，其他使用background方式实现
			if(isSmallScreen){
				$item.html('<img src="'+imgSrc+'" alt="" />')
			}else{
				$item.html('');		

					}

		});
	}
	$(window).on('resize',resize).trigger('resize');
	//初始化tooltip插件
  	$('[data-toggle="tooltip"]').tooltip();
	/**
	 * 控制标签页的标签容器宽度
	 */
	var $ulContainer = $('.nav-tabs');
	//获取子元素的宽度和
	var width=20;
	$ulContainer.children().each(function(index,element){
		//console.log(element.clientWidth);
		//console.log($(element).width());
		width+=element.clientWidth;
	});
	//此时width等于li元素宽度的总和
	$ulContainer.css('width',width);


	//给a注册点击事件
	var $newstitle=$('.news-title');
	$('#news .nav-pills a').on('click',function(){
		//获取当前点击元素
		var $this=$(this);
		//获取对应的title值
		var title=$this.data('title');
		//将title值设置到对应位置
		//console.log(title);
		$newstitle.text(title);
	});


	//1.获得手指在轮播图上的一个滑动方向（左右）
	

	var $carousels=$('.carousel');//获取界面上的轮播图容器
	//注册滑动事件
	var startX,endX;
	var offset=50;
	
		$carousels.on('touchstart',function(e){//手指触摸开始时记录下手指所在的坐标x
			// console.log(e);
			// console.log(e.originalEvent.touches[0].clientX);
			startX=e.originalEvent.touches[0].clientX;
			//console.log(startX);
		});
		$carousels.on('touchmove',function(e){//记录多个值，每次值不断被覆盖，手指触摸离开轮播图，一瞬间记录下手指所在的坐标x
			// console.log(e);
			 //console.log(e.originalEvent.touches[0].clientX);
			 
			endX=e.originalEvent.touches[0].clientX;
			
		});
		$carousels.on('touchend',function(e){
				//结束一瞬间记录下手指所在的坐标x
				//比较大小
	
			//console.log(endX);
			 //控制精度
			 //获取每次运动的距离，当距离大于一定值时认为方向有变化
			var distance=Math.abs(startX-endX);
			if(distance>offset){
				//2.根据获得的方向选择上一张或者下一张
				//$(a).click()滑动触发(左右)click事件
				//原生的carousel（）方法实现http://v3.bootcss.com/javascript/#carousel-methods
				 //console.log(startX>endX?"←":"→");
				$(this).carousel(startX>endX?"next":"prev");
			}
		});
	
	

})