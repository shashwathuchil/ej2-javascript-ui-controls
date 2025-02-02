define(["require", "exports", "./marker", "../../smithchart/utils/helper", "../../smithchart/utils/utils", "../../smithchart/utils/helper", "../../smithchart/model/constant", "../../smithchart/series/datalabel", "@syncfusion/ej2-base", "../model/constant"], function (require, exports, marker_1, helper_1, utils_1, helper_2, constant_1, datalabel_1, ej2_base_1, constant_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SeriesRender = (function () {
        function SeriesRender() {
            this.xValues = [];
            this.yValues = [];
            this.pointsRegion = [];
            this.lineSegments = [];
            this.location = [];
            this.dataLabel = new datalabel_1.DataLabel();
        }
        SeriesRender.prototype.processData = function (series) {
            var dataArray = series.dataSource;
            var resistance = series.resistance;
            var reactance = series.reactance;
            var tooltip = series.tooltipMappingName;
            series.points = [];
            for (var i = 0; i < dataArray.length; i++) {
                series.points.push({
                    resistance: dataArray[i][resistance],
                    reactance: dataArray[i][reactance],
                    tooltip: dataArray[i][tooltip]
                });
            }
        };
        SeriesRender.prototype.draw = function (smithchart, axisRender, bounds) {
            var groupElement = smithchart.renderer.createGroup({ 'id': smithchart.element.id + '_svg' + '_seriesCollections' });
            var resistantCx;
            var reactanceCy;
            var series = smithchart.series;
            var seriesLength = series.length;
            var chartAreaRadius = axisRender.areaRadius;
            var interSectPoint;
            var index;
            for (var m = 0; m < seriesLength; m++) {
                var seriesIndex = m;
                if (series[m].dataSource && series[m].resistance && series[m].reactance) {
                    this.processData(series[m]);
                }
                this.pointsRegion[m] = [];
                this.location[m] = [];
                for (var j = 0; j < series[m].points.length; j++) {
                    this.xValues[j] = series[m].points[j]['resistance'];
                    this.yValues[j] = series[m].points[j]['reactance'];
                }
                var chartAreaCx = axisRender.circleCenterX;
                var chartAreaCy = axisRender.circleCenterY;
                var diameter = axisRender.areaRadius * 2;
                var reactanceStartPoint = {
                    x: chartAreaCx + ((smithchart.renderType === 'Impedance') ?
                        chartAreaRadius : -chartAreaRadius), y: chartAreaCy
                };
                var resistantCy = chartAreaCy;
                var reactanceCx = reactanceStartPoint.x;
                for (var k = 0; k < series[m].points.length; k++) {
                    var resistance = this.xValues[k];
                    var resistantR = (diameter * (1 / (resistance + 1))) / 2;
                    var reactance = this.yValues[k];
                    var reactanceR = Math.abs(((1 / reactance) * diameter) / 2);
                    if (smithchart.renderType === 'Impedance') {
                        reactanceCy = reactance > 0 ? chartAreaCy - reactanceR : chartAreaCy + reactanceR;
                        resistantCx = (axisRender.circleLeftX + diameter - resistantR);
                    }
                    else {
                        reactanceCy = reactance < 0 ? chartAreaCy - reactanceR : chartAreaCy + reactanceR;
                        resistantCx = (axisRender.circleLeftX + resistantR);
                    }
                    interSectPoint = axisRender.intersectingCirclePoints(reactanceCx, reactanceCy, reactanceR, resistantCx, resistantCy, resistantR, smithchart.renderType);
                    var epsilon = helper_2._getEpsilonValue();
                    if (Math.abs(reactance) < epsilon) {
                        interSectPoint.x = (smithchart.renderType === 'Impedance') ?
                            resistantCx - resistantR : resistantCx + resistantR;
                        interSectPoint.y = chartAreaCy;
                    }
                    this.pointsRegion[m][k] = new utils_1.PointRegion();
                    this.pointsRegion[m][k] = { point: interSectPoint, x: resistance, y: reactance };
                    this.location[m][k] = { x: interSectPoint.x, y: interSectPoint.y };
                }
                for (var i = 0; i < series[m].points.length - 1; i++) {
                    index = i + 1;
                    this.lineSegments[i] = new utils_1.LineSegment();
                    this.lineSegments[i] = { x1: this.xValues[i], y1: this.yValues[i], x2: this.xValues[index], y2: this.yValues[index] };
                }
                smithchart.svgObject.appendChild(groupElement);
                this.drawSeries(smithchart, seriesIndex, groupElement, bounds);
            }
            for (var j = 0; j < smithchart.series.length; j++) {
                if (smithchart.series[j].enableSmartLabels && smithchart.series[j].marker.dataLabel.visible) {
                    var gdlcEle = smithchart.renderer.createGroup({
                        'id': smithchart.element.id + '_svg'
                            + '_series' + j + '_Datalabel' + '_connectorLines'
                    });
                    var element = document.getElementById(smithchart.element.id + '_svg' + '_seriesCollection' + j);
                    if (element) {
                        element.appendChild(gdlcEle);
                    }
                    this.dataLabel.calculateSmartLabels(this.dataLabel.labelOptions[j], j);
                    for (var k = 0; k < smithchart.series[j].points.length; k++) {
                        var currentPoint = this.dataLabel.labelOptions[j]['textOptions'][k];
                        if ((currentPoint.xPosition + currentPoint.width) > (smithchart.chartArea.x + smithchart.chartArea.width)
                            || currentPoint.xPosition < smithchart.chartArea.x || currentPoint.yPosition < smithchart.chartArea.y ||
                            currentPoint.yPosition + currentPoint.height > smithchart.chartArea.y + smithchart.chartArea.height) {
                            this.dataLabel.labelOptions[j].textOptions[k].connectorFlag = false;
                            this.dataLabel.labelOptions[j].textOptions[k].visible = false;
                        }
                        if (currentPoint['connectorFlag']) {
                            this.dataLabel.drawConnectorLines(smithchart, j, k, currentPoint, gdlcEle);
                        }
                    }
                }
            }
            var _loop_1 = function (j) {
                var dataLabel = smithchart.series[j].marker.dataLabel;
                if (smithchart.series[j].marker.dataLabel.visible) {
                    var element = document.getElementById(smithchart.element.id + '_svg' + '_seriesCollection' + j);
                    var gdEle_1 = smithchart.renderer.createGroup({
                        'id': smithchart.element.id + '_svg'
                            + '_series' + j + '_Datalabel'
                    });
                    if (element) {
                        element.appendChild(gdEle_1);
                    }
                    var _loop_2 = function (k) {
                        var currentPoint = this_1.dataLabel.labelOptions[j]['textOptions'][k];
                        if (!dataLabel.template && currentPoint.visible) {
                            var options_1 = new utils_1.DataLabelTextOptions();
                            options_1 = this_1.dataLabel.labelOptions[j]['textOptions'][k];
                            var font_1 = dataLabel.textStyle;
                            var x = options_1['xPosition'];
                            var y = options_1['yPosition'];
                            var id = smithchart.element.id + '_Series' + j + '_Points' + k + '_dataLabel' + '_symbol' + k;
                            var fill = dataLabel['fill'] ? dataLabel['fill'] : (smithchart.series[j].fill ||
                                smithchart.seriesColors[j % smithchart.seriesColors.length]);
                            var border = smithchart.series[j].marker.dataLabel.border;
                            var rectOptions = new helper_2.RectOption(id, fill, border, options_1['opacity'], new utils_1.SmithchartRect(x, y, options_1['width'], options_1['height']));
                            var dataEle = smithchart.renderer.drawRectangle(rectOptions);
                            gdEle_1.appendChild(dataEle);
                            var textRenderEventArgs = {
                                text: options_1['text'],
                                x: options_1['x'],
                                y: options_1['y'],
                                seriesIndex: j,
                                pointIndex: k,
                                name: constant_2.textRender,
                                cancel: false
                            };
                            var textRenderSuccess = function (args) {
                                if (!args.cancel) {
                                    var textoptions = new helper_1.TextOption(options_1['id'], args.x, args.y, 'start', args.text);
                                    var color = font_1.color ? font_1.color : smithchart.themeStyle.dataLabel;
                                    var element_1 = helper_1.renderTextElement(textoptions, font_1, color, gdEle_1);
                                    gdEle_1.appendChild(element_1);
                                }
                            };
                            textRenderSuccess.bind(this_1);
                            smithchart.trigger(constant_2.textRender, textRenderEventArgs, textRenderSuccess);
                        }
                        else if (dataLabel.template) {
                            var element_2 = document.getElementById(dataLabel.template + '_seriesIndex' + j + '_pointIndex' +
                                k + smithchart.element.id);
                            element_2.style.left = this_1.dataLabel.labelOptions[j]['textOptions'][k].xPosition + 'px';
                            element_2.style.top = this_1.dataLabel.labelOptions[j]['textOptions'][k].yPosition + 'px';
                        }
                    };
                    for (var k = 0; k < smithchart.series[j].points.length; k++) {
                        _loop_2(k);
                    }
                }
            };
            var this_1 = this;
            for (var j = 0; j < smithchart.series.length; j++) {
                _loop_1(j);
            }
            for (var i = 0; i < smithchart.series.length; i++) {
                if (smithchart.series[i].enableAnimation && smithchart.animateSeries) {
                    if (smithchart.series[i].marker.dataLabel.template) {
                        this.animateDataLabelTemplate(i, smithchart);
                    }
                    var element = document.getElementById(smithchart.element.id + '_svg' + '_seriesCollection' + i);
                    this.performAnimation(smithchart, element, i);
                }
            }
        };
        SeriesRender.prototype.drawSeries = function (smithchart, seriesindex, groupElement, bounds) {
            var _this = this;
            var gsEle = smithchart.renderer.createGroup({
                'id': smithchart.element.id + '_svg' + '_seriesCollection' + seriesindex,
                'clip-path': 'url(#' + smithchart.element.id + '_ChartSeriesClipRect_' +
                    seriesindex + ')'
            });
            gsEle.setAttribute('visibility', smithchart.series[seriesindex].visibility);
            groupElement.appendChild(gsEle);
            var sb = '';
            var path;
            var marker = smithchart.series[seriesindex].marker;
            var element;
            var count = smithchart.series[seriesindex].points.length - 1;
            for (var i = 0; i < count; i++) {
                var point1 = this.pointsRegion[seriesindex][i]['point'];
                var point2 = this.pointsRegion[seriesindex][i + 1]['point'];
                sb = sb + ('M' + ' ' + (point1.x) + ' ' + (point1.y) + ' ' + 'L' +
                    ' ' + (point2.x) + ' ' + (point2.y) + ' ');
            }
            path = sb.toString();
            var fill = smithchart.series[seriesindex].fill || smithchart.seriesColors[seriesindex % smithchart.seriesColors.length];
            var seriesEventArgs = {
                text: smithchart.series[seriesindex].name,
                fill: fill,
                name: constant_2.seriesRender,
                cancel: false
            };
            var seriesRenderSuccess = function (args) {
                if (!args.cancel) {
                    var options = new helper_2.PathOption(smithchart.element.id + '_series' + seriesindex + '_points', 'none', smithchart.series[seriesindex].width, seriesEventArgs.fill, smithchart.series[seriesindex].opacity, 'none', path);
                    _this.clipRectElement = smithchart.renderer.drawClipPath(new helper_2.RectOption(smithchart.element.id + '_ChartSeriesClipRect_' + seriesindex, 'transparent', { width: 1, color: 'Gray' }, 1, {
                        x: bounds.x, y: bounds.y,
                        width: smithchart.availableSize.width,
                        height: smithchart.availableSize.height
                    }));
                    gsEle.appendChild(_this.clipRectElement);
                    var gspEle = smithchart.renderer.createGroup({ 'id': smithchart.element.id + '_svg' + seriesindex });
                    element = smithchart.renderer.drawPath(options);
                    gspEle.appendChild(element);
                    gsEle.appendChild(gspEle);
                }
            };
            seriesRenderSuccess.bind(this);
            smithchart.trigger(constant_2.seriesRender, seriesEventArgs, seriesRenderSuccess);
            var markerrender = new marker_1.Marker();
            markerrender.drawMarker(smithchart, seriesindex, gsEle, this.pointsRegion[seriesindex]);
            this.dataLabel.drawDataLabel(smithchart, seriesindex, gsEle, this.pointsRegion[seriesindex], bounds);
        };
        SeriesRender.prototype.animateDataLabelTemplate = function (seriesindex, smithchart) {
            var length = smithchart.series[seriesindex].points.length;
            var opacity = 0;
            var delay = 0;
            var duration = parseFloat(smithchart.series[seriesindex].animationDuration);
            for (var i = 0; i < length; i++) {
                var element = document.getElementById(smithchart.series[seriesindex].marker.dataLabel.template +
                    '_seriesIndex' + seriesindex + '_pointIndex' + i + smithchart.element.id);
                element.style.visibility = 'hidden';
                helper_2.templateAnimate(smithchart, element, delay, duration, 'FadeIn');
            }
        };
        SeriesRender.prototype.performAnimation = function (smithchart, gsEle, seriesIndex) {
            var animation = new ej2_base_1.Animation({});
            var element = document.getElementById('container_svg_seriesCollections');
            var clipRect = gsEle.childNodes[0].childNodes[0].childNodes[0];
            var effect = helper_2.getAnimationFunction('Linear');
            var reveffect = helper_2.getAnimationFunction('Reverse');
            var width = +clipRect.getAttribute('width');
            var x = +clipRect.getAttribute('x');
            var value;
            animation.animate(clipRect, {
                duration: parseFloat(smithchart.series[seriesIndex].animationDuration),
                progress: function (args) {
                    if (smithchart.renderType === 'Impedance') {
                        value = effect(args.timeStamp - args.delay, 0, width, args.duration);
                        clipRect.setAttribute('width', value.toString());
                    }
                    else {
                        value = reveffect(args.timeStamp - args.delay, width, 0, args.duration);
                        clipRect.setAttribute('x', value.toString());
                    }
                },
                end: function (model) {
                    if (smithchart.renderType === 'Impedance') {
                        clipRect.setAttribute('width', width.toString());
                    }
                    else {
                        clipRect.setAttribute('x', x.toString());
                    }
                    var event = {
                        cancel: false,
                        name: constant_1.animationComplete,
                        smithchart: smithchart
                    };
                    smithchart.trigger(constant_1.animationComplete, event);
                }
            });
        };
        SeriesRender.prototype.getLocation = function (seriesindex, pointIndex) {
            var x;
            var y;
            x = this.location[seriesindex][pointIndex].x;
            y = this.location[seriesindex][pointIndex].y;
            return { x: x, y: y };
        };
        return SeriesRender;
    }());
    exports.SeriesRender = SeriesRender;
});
