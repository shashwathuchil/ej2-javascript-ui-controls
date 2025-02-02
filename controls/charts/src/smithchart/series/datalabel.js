define(["require", "exports", "@syncfusion/ej2-base", "../../smithchart/utils/helper", "../../smithchart/utils/helper", "../../smithchart/utils/utils", "../../smithchart/utils/utils"], function (require, exports, ej2_base_1, helper_1, helper_2, utils_1, utils_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DataLabel = (function () {
        function DataLabel() {
            this.textOptions = [];
            this.labelOptions = [];
            this.allPoints = [];
        }
        DataLabel.prototype.drawDataLabel = function (smithchart, seriesindex, groupElement, pointsRegion, bounds) {
            this.textOptions = [];
            this.allPoints = [];
            var margin = smithchart.margin;
            var pointIndex;
            var marker = smithchart.series[seriesindex].marker;
            var region;
            var labelPosition;
            var labelText;
            var textSize;
            var dataLabel = marker.dataLabel;
            var font = dataLabel.textStyle;
            var count = pointsRegion.length;
            for (var i = 0; i < count; i++) {
                labelText = smithchart.series[seriesindex].points[i].reactance.toString();
                textSize = helper_1.measureText(labelText, font);
                region = pointsRegion[i]['point'];
                var xPos = region.x - textSize.width / 2;
                var yPos = region.y - (textSize.height + marker['height'] + (margin.top));
                var width = textSize.width + (margin.left / 2) + (margin.right / 2);
                var height = textSize.height + (margin.top / 2) + (margin.bottom / 2);
                pointIndex = i;
                labelPosition = new utils_1.SmithchartLabelPosition();
                labelPosition = { textX: xPos + (margin.left / 2), textY: yPos + (height / 2) + margin.top / 2, x: xPos, y: yPos };
                this.textOptions[i] = {
                    id: smithchart.element.id + '_Series' + seriesindex + '_Points' + pointIndex + '_dataLabel' + '_displayText' + i,
                    x: labelPosition['textX'],
                    y: labelPosition['textY'],
                    fill: 'black',
                    text: labelText,
                    font: font,
                    xPosition: xPos,
                    yPosition: yPos,
                    width: width,
                    height: height,
                    location: region,
                    labelOptions: labelPosition,
                    visible: true,
                    connectorFlag: null
                };
            }
            var labelOption = new utils_2.LabelOption();
            labelOption.textOptions = this.textOptions;
            this.labelOptions.push(labelOption);
            this.drawDatalabelSymbol(smithchart, seriesindex, dataLabel, groupElement, bounds, pointsRegion);
        };
        DataLabel.prototype.calculateSmartLabels = function (points, seriesIndex) {
            var length = points['textOptions'].length;
            var count = 0;
            for (var k = 0; k < length; k++) {
                this.allPoints[this.allPoints.length] = points['textOptions'][k];
                this.connectorFlag = false;
                this.compareDataLabels(k, points, count, seriesIndex);
                this.labelOptions[seriesIndex]['textOptions'][k] = points['textOptions'][k];
                this.labelOptions[seriesIndex]['textOptions'][k].connectorFlag = this.connectorFlag;
            }
        };
        DataLabel.prototype.compareDataLabels = function (i, points, count, m) {
            var length = this.allPoints.length;
            var padding = 10;
            var collide;
            var currentLabel;
            var prevLabel;
            for (var j = 0; j < length; j++) {
                prevLabel = this.allPoints[j];
                currentLabel = this.allPoints[length - 1];
                collide = this.isCollide(prevLabel, currentLabel);
                if (collide) {
                    this.connectorFlag = true;
                    switch (count) {
                        case 0:
                            this.resetValues(currentLabel);
                            this.prevLabel = prevLabel;
                            currentLabel['xPosition'] = this.prevLabel['xPosition'] + (this.prevLabel['width'] / 2 +
                                currentLabel['width'] / 2 + padding);
                            currentLabel['x'] = currentLabel['xPosition'] + padding / 2;
                            count += 1;
                            this.compareDataLabels(i, points, count, m);
                            break;
                        case 1:
                            this.resetValues(currentLabel);
                            currentLabel['xPosition'] = this.prevLabel['xPosition'] + this.prevLabel['width'] / 2 +
                                currentLabel['width'] / 2 + padding;
                            currentLabel['x'] = currentLabel['xPosition'] + padding / 2;
                            currentLabel['yPosition'] = currentLabel['location'].y + currentLabel['height'] / 2 + padding / 2;
                            currentLabel['y'] = currentLabel['yPosition'] + ((currentLabel['height'] / 2)) + padding / 2;
                            count += 1;
                            this.compareDataLabels(i, points, count, m);
                            break;
                        case 2:
                            this.resetValues(currentLabel);
                            currentLabel['yPosition'] = currentLabel['location'].y + currentLabel['height'] / 2 + padding / 2;
                            currentLabel['y'] = currentLabel['yPosition'] + (currentLabel['height'] / 2) + padding / 2;
                            count += 1;
                            this.compareDataLabels(i, points, count, m);
                            break;
                        case 3:
                            this.resetValues(currentLabel);
                            currentLabel['xPosition'] = this.prevLabel['xPosition'] - this.prevLabel['width'] / 2
                                - currentLabel['width'] / 2 - padding;
                            currentLabel['x'] = currentLabel['xPosition'] + padding / 2;
                            currentLabel['yPosition'] = currentLabel['height'] / 2 + currentLabel['location'].y + padding / 2;
                            currentLabel['y'] = currentLabel['yPosition'] + ((currentLabel['height'] / 2)) + padding / 2;
                            count += 1;
                            this.compareDataLabels(i, points, count, m);
                            break;
                        case 4:
                            this.resetValues(currentLabel);
                            currentLabel['xPosition'] = (this.prevLabel['xPosition'] - this.prevLabel['width'] / 2 -
                                currentLabel['width'] / 2 - padding);
                            currentLabel['x'] = currentLabel['xPosition'] + padding / 2;
                            count += 1;
                            this.compareDataLabels(i, points, count, m);
                            break;
                        case 5:
                            this.resetValues(currentLabel);
                            currentLabel['xPosition'] = this.prevLabel['xPosition'] - this.prevLabel['width'] / 2 -
                                currentLabel['width'] / 2 - padding;
                            currentLabel['x'] = currentLabel['xPosition'] + padding / 2;
                            currentLabel['yPosition'] = this.prevLabel['yPosition'] - currentLabel['height'] - padding;
                            currentLabel['y'] = currentLabel['yPosition'] + currentLabel['height'] / 2 + padding / 2;
                            count += 1;
                            this.compareDataLabels(i, points, count, m);
                            break;
                        case 6:
                            this.resetValues(currentLabel);
                            currentLabel['yPosition'] = (this.prevLabel['yPosition']) - (currentLabel['height'] + padding);
                            currentLabel['y'] = currentLabel['yPosition'] + (currentLabel['height'] / 2) + padding / 2;
                            count += 1;
                            this.compareDataLabels(i, points, count, m);
                            break;
                        case 7:
                            this.resetValues(currentLabel);
                            currentLabel['xPosition'] = this.prevLabel['xPosition'] + this.prevLabel['width'] / 2 +
                                currentLabel['width'] / 2 + padding;
                            currentLabel['x'] = currentLabel['xPosition'] + padding / 2;
                            currentLabel['yPosition'] = this.prevLabel['yPosition'] - currentLabel['height'] - padding;
                            currentLabel['y'] = currentLabel['yPosition'] + (currentLabel['height'] / 2) + padding / 2;
                            count += 1;
                            this.compareDataLabels(i, points, count, m);
                            break;
                        case 8:
                            count = 0;
                            this.compareDataLabels(i, points, count, m);
                            break;
                    }
                }
            }
        };
        DataLabel.prototype.isCollide = function (dataLabel1, dataLabel2) {
            var state = false;
            if (dataLabel1 !== dataLabel2) {
                state = !(((dataLabel1['y'] + dataLabel1['height']) < (dataLabel2['y'])) ||
                    (dataLabel1['y'] > (dataLabel2['y'] + dataLabel2['height'])) ||
                    ((dataLabel1['x'] + dataLabel1['width'] / 2) < dataLabel2['x'] - dataLabel2['width'] / 2) ||
                    (dataLabel1['x'] - dataLabel1['width'] / 2 > (dataLabel2['x'] + dataLabel2['width'] / 2)));
            }
            return state;
        };
        DataLabel.prototype.resetValues = function (currentPoint) {
            currentPoint['xPosition'] = currentPoint['labelOptions']['x'];
            currentPoint['yPosition'] = currentPoint['labelOptions']['y'];
            currentPoint['x'] = currentPoint['labelOptions']['textX'];
            currentPoint['y'] = currentPoint['labelOptions']['textY'];
        };
        DataLabel.prototype.drawConnectorLines = function (smithchart, seriesIndex, index, currentPoint, groupElement) {
            var location = currentPoint['location'];
            var endY;
            if (location.y > currentPoint['y']) {
                endY = (currentPoint['y']);
            }
            else {
                endY = (currentPoint['y'] - currentPoint['height'] / 2);
            }
            var connectorDirection = 'M' + ' ' + (location.x) + ' ' + (location.y) + ' ' + 'L' + ' ' +
                (currentPoint['x']) + ' ' + (endY);
            var connectorLineValues = smithchart.series[seriesIndex].marker.dataLabel.connectorLine;
            var stroke = connectorLineValues.color ? connectorLineValues.color :
                (smithchart.series[seriesIndex].fill ||
                    smithchart.seriesColors[seriesIndex % smithchart.seriesColors.length]);
            var options = new helper_2.PathOption(smithchart.element.id + '_dataLabelConnectorLine' + '_series' + seriesIndex + '_point' + index, 'none', connectorLineValues.width, stroke, 1, 'none', connectorDirection);
            var element = smithchart.renderer.drawPath(options);
            groupElement.appendChild(element);
        };
        DataLabel.prototype.drawDatalabelSymbol = function (smithchart, seriesindex, dataLabel, groupElement, bounds, pointsRegion) {
            for (var i = 0; i < smithchart.series[seriesindex].points.length; i++) {
                if (dataLabel.template) {
                    var labelTemplateElement = ej2_base_1.createElement('div', {
                        id: smithchart.element.id + '_seriesIndex_' + seriesindex + '_Label_Template_Group',
                        className: 'template',
                        styles: 'position: absolute;'
                    });
                    document.getElementById(smithchart.element.id + '_Secondary_Element').appendChild(labelTemplateElement);
                    var id = dataLabel.template + '_seriesIndex' + seriesindex + '_pointIndex' + i + smithchart.element.id;
                    var data = { point: smithchart.series[seriesindex].points[i].reactance };
                    var templateFn = helper_2.getTemplateFunction(dataLabel.template);
                    var templateElement = templateFn(smithchart);
                    var labelElement = helper_2.convertElementFromLabel(templateElement, id, data);
                    labelTemplateElement.appendChild(labelElement);
                    labelElement.style.left = pointsRegion[i].point.x - labelElement.offsetWidth / 2 + 'px';
                    labelElement.style.top = pointsRegion[i].point.y - labelElement.offsetHeight -
                        smithchart.series[seriesindex].marker.height / 2 + 'px';
                    var left = parseInt(labelElement.style.left, 10);
                    var top_1 = parseInt(labelElement.style.top, 10);
                    var width = labelElement.offsetWidth;
                    var height = labelElement.offsetHeight;
                    var region = pointsRegion[i]['point'];
                    var labelPosition = { textX: left, textY: top_1,
                        x: left, y: top_1 };
                    this.labelOptions[seriesindex]['textOptions'][i] = {
                        id: id,
                        x: left,
                        y: top_1,
                        fill: 'black',
                        text: '',
                        font: dataLabel.textStyle,
                        xPosition: left,
                        yPosition: top_1,
                        width: width,
                        height: height,
                        location: region,
                        labelOptions: labelPosition,
                        visible: true,
                        connectorFlag: null
                    };
                }
            }
        };
        return DataLabel;
    }());
    exports.DataLabel = DataLabel;
});
