define(["require", "exports", "@syncfusion/ej2-base"], function (require, exports, ej2_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseSelection = (function () {
        function BaseSelection(control) {
            this.control = control;
        }
        BaseSelection.prototype.seriesStyles = function () {
            var seriesclass;
            var style = document.getElementById(this.styleId);
            var pattern = '{}';
            var fill;
            var opacity;
            var selectionPattern = this.control.selectionPattern;
            var highlightPattern = this.control.highlightPattern;
            if ((this.styleId.indexOf('highlight') > 0 && this.control.highlightColor !== '') || ej2_base_1.isNullOrUndefined(style) || selectionPattern !== 'None' || highlightPattern !== 'None') {
                style = document.createElement('style');
                style.setAttribute('id', this.styleId);
                for (var _i = 0, _a = this.control.visibleSeries; _i < _a.length; _i++) {
                    var series = _a[_i];
                    var visibleSeries = this.control.visibleSeries[series.index] ||
                        this.control.visibleSeries[series.index];
                    if ((this.styleId.indexOf('highlight') > 0 && this.control.highlightColor !== '') || (!ej2_base_1.isNullOrUndefined(selectionPattern) || !ej2_base_1.isNullOrUndefined(highlightPattern)) &&
                        (selectionPattern !== 'None' || highlightPattern !== 'None')) {
                        var patternName = this.styleId.indexOf('highlight') > 0 ? highlightPattern : selectionPattern;
                        if (visibleSeries.type === 'Pie' || visibleSeries.type === 'Funnel' ||
                            visibleSeries.type === 'Pyramid') {
                            for (var i = 0; i < visibleSeries.points.length; i++) {
                                opacity = visibleSeries.opacity;
                                fill = this.pattern(this.control, (visibleSeries.points[i]).color, series.index, patternName, opacity);
                                pattern = '{ fill:' + fill + '}';
                            }
                        }
                        else if (visibleSeries.type) {
                            opacity = visibleSeries.opacity;
                            fill = this.pattern(this.control, (this.styleId.indexOf('highlight') > 0 && this.control.highlightColor !== '') ? this.control.highlightColor :
                                (visibleSeries.pointColorMapping !== '' || (this.control.rangeColorSettings && this.control.rangeColorSettings.length > 1)) ? (visibleSeries.points[0]).color
                                    : visibleSeries.interior, series.index, patternName, opacity);
                            pattern = '{ fill:' + fill + '}';
                        }
                    }
                    seriesclass = series.selectionStyle || this.styleId + '_series_' + series.index + ',' + '.' +
                        this.styleId + '_series_' + series.index + '> *';
                    pattern = (pattern.indexOf('None') > -1) ? '{}' : pattern;
                    style.innerHTML += series.selectionStyle ? '' : '.' + seriesclass + pattern;
                }
                var unSelectOpacity = 0.3;
                if (ej2_base_1.isNullOrUndefined(this.control.selectionModule) && this.control.selectionMode === 'None' && this.control.highlightColor !== '') {
                    unSelectOpacity = 1;
                }
                style.innerHTML += '.' + this.unselected + ' { opacity:' + (unSelectOpacity) + ';} ';
                document.body.appendChild(style);
            }
        };
        BaseSelection.prototype.pattern = function (chart, color, index, patternName, opacity) {
            var backgroundColor = '#ffffff';
            var svg = chart.svgObject;
            var pathOptions = [];
            var patternGroup = {
                'id': chart.element.id + '_' + patternName + '_Selection' + '_' + index, 'patternUnits': 'userSpaceOnUse'
            };
            var heightStr = 'height';
            var widthStr = 'width';
            var width = 10;
            var height = 12;
            var patternNum = 6;
            var turquoiseNum = 17;
            var turstrokewidth = 1;
            var starNum = 21;
            var circleNum = 9;
            var tileNum = 18;
            var strokeWidth = 1;
            var bubNum = 20;
            switch (patternName) {
                case 'Dots':
                    patternGroup[heightStr] = patternGroup[widthStr] = patternNum;
                    patternGroup[widthStr] = patternNum;
                    pathOptions[0] = {
                        'x': 0, 'y': 0, 'width': 7, 'height': 7, 'transform': 'translate(0,0)',
                        'fill': backgroundColor, 'opacity': opacity, 'name': 'rect'
                    };
                    pathOptions[1] = {
                        'cx': 3,
                        'cy': 3,
                        'r': 2,
                        'stroke-width': 1,
                        'fill': color,
                        'name': 'circle'
                    };
                    break;
                case 'Pacman':
                    patternGroup[heightStr] = '18.384';
                    patternGroup[widthStr] = '17.917';
                    pathOptions[0] = {
                        'name': 'rect', 'x': 0, 'y': 0, 'width': 17.917, 'height': 18.384,
                        'transform': 'translate(0,0)', 'fill': backgroundColor, 'opacity': opacity
                    };
                    pathOptions[1] = {
                        'name': 'path', 'd': 'M9.081,9.194l5.806-3.08c-0.812-1.496-2.403-3.052-4.291-3.052H8.835C6.138,3.063,3,6.151,3,8.723v1.679   c0,2.572,3.138,5.661,5.835,5.661h1.761c2.085,0,3.835-1.76,4.535-3.514L9.081,9.194z', 'stroke-width': 1, 'stroke': color, 'fill': color
                    };
                    break;
                case 'Chessboard':
                    patternGroup[heightStr] = patternGroup[widthStr] = width;
                    pathOptions[0] = {
                        'x': 0, 'y': 0, 'width': width, 'height': width, 'fill': backgroundColor, 'opacity': opacity,
                        'name': 'rect'
                    };
                    pathOptions[1] = { 'x': 0, 'y': 0, 'width': 5, 'height': 5, 'fill': color, 'opacity': opacity, 'name': 'rect' };
                    pathOptions[2] = { 'x': 5, 'y': 5, 'width': 5, 'height': 5, 'fill': color, 'opacity': opacity, 'name': 'rect' };
                    break;
                case 'Crosshatch':
                    patternGroup[heightStr] = patternGroup[widthStr] = '8';
                    pathOptions[0] = {
                        'x': 0, 'y': 0, 'width': 8, 'height': 8, 'transform': 'translate(0,0)',
                        'fill': backgroundColor, 'opacity': opacity, 'name': 'rect'
                    };
                    pathOptions[1] = {
                        'd': 'M0 0L8 8ZM8 0L0 8Z',
                        'stroke-width': 1,
                        'stroke': color,
                        'name': 'path'
                    };
                    break;
                case 'DiagonalForward':
                    patternGroup[heightStr] = patternGroup[widthStr] = patternNum;
                    pathOptions[0] = {
                        'x': 0, 'y': 0, 'width': patternNum, 'height': patternNum, 'transform': 'translate(0,0)',
                        'fill': backgroundColor, 'opacity': opacity, 'name': 'rect'
                    };
                    pathOptions[1] = {
                        'd': 'M 3 -3 L 9 3 M 6 6 L 0 0 M 3 9 L -3 3',
                        'stroke-width': 2,
                        'stroke': color,
                        'name': 'path'
                    };
                    break;
                case 'DiagonalBackward':
                    patternGroup[heightStr] = patternGroup[widthStr] = patternNum;
                    pathOptions[0] = {
                        'x': 0, 'y': 0, 'width': patternNum, 'height': patternNum, 'transform': 'translate(0,0)',
                        'fill': backgroundColor, 'opacity': opacity, 'name': 'rect'
                    };
                    pathOptions[1] = {
                        'd': 'M 3 -3 L -3 3 M 0 6 L 6 0 M 9 3 L 3 9',
                        'stroke-width': 2,
                        'stroke': color,
                        'name': 'path'
                    };
                    break;
                case 'Grid':
                    patternGroup[heightStr] = patternGroup[widthStr] = patternNum;
                    pathOptions[0] = {
                        'name': 'rect', 'x': 0, 'y': 0, 'width': patternNum, 'height': patternNum, 'transform': 'translate(0,0)',
                        'fill': backgroundColor, 'opacity': opacity
                    };
                    pathOptions[1] = {
                        'name': 'path',
                        'd': 'M1 3.5L11 3.5 M0 3.5L11 3.5 M0 7.5L11 7.5 M0 11.5L11 11.5 M5.5 0L5.5 12 M11.5 0L11.5 12Z',
                        'stroke-width': 1,
                        'stroke': color
                    };
                    break;
                case 'Turquoise':
                    patternGroup[heightStr] = patternGroup[widthStr] = turquoiseNum;
                    pathOptions[0] = {
                        'name': 'rect', 'x': 0, 'y': 0, 'width': turquoiseNum, 'height': turquoiseNum, 'transform': 'translate(0,0)',
                        'fill': backgroundColor, 'opacity': opacity
                    };
                    pathOptions[1] = {
                        'name': 'path', 'd': 'M0.5739999999999998,2.643a2.123,2.111 0 1,0 4.246,0a2.123,2.111 0 1,0 -4.246,0',
                        'stroke-width': turstrokewidth, 'stroke-miterlimit': width, 'stroke': color, 'fill': color
                    };
                    pathOptions[2] = {
                        'name': 'path', 'd': 'M11.805,2.643a2.123,2.111 0 1,0 4.246,0a2.123,2.111 0 1,0 -4.246,0',
                        'stroke-width': turstrokewidth, 'stroke-miterlimit': width, 'stroke': color, 'fill': color
                    };
                    pathOptions[3] = {
                        'name': 'path', 'd': 'M6.19,2.643a2.123,2.111 0 1,0 4.246,0a2.123,2.111 0 1,0 -4.246,0',
                        'stroke-width': turstrokewidth, 'stroke-miterlimit': width, 'stroke': color, 'fill': color
                    };
                    pathOptions[4] = {
                        'name': 'path', 'd': 'M11.805,8.217a2.123,2.111 0 1,0 4.246,0a2.123,2.111 0 1,0 -4.246,0',
                        'stroke-width': turstrokewidth, 'stroke-miterlimit': width, 'stroke': color, 'fill': color
                    };
                    pathOptions[5] = {
                        'name': 'path', 'd': 'M6.19,8.217a2.123,2.111 0 1,0 4.246,0a2.123,2.111 0 1,0 -4.246,0',
                        'stroke-width': turstrokewidth, 'stroke-miterlimit': width, 'stroke': color, 'fill': color
                    };
                    pathOptions[6] = {
                        'name': 'path', 'd': 'M11.805,13.899a2.123,2.111 0 1,0 4.246,0a2.123,2.111 0 1,0 -4.246,0',
                        'stroke-width': turstrokewidth, 'stroke-miterlimit': width, 'stroke': color, 'fill': color
                    };
                    pathOptions[7] = {
                        'name': 'path', 'd': 'M6.19,13.899a2.123,2.111 0 1,0 4.246,0a2.123,2.111 0 1,0 -4.246,0',
                        'stroke-width': turstrokewidth, 'stroke-miterlimit': width, 'stroke': color, 'fill': color
                    };
                    break;
                case 'Star':
                    patternGroup[heightStr] = patternGroup[widthStr] = starNum;
                    pathOptions[0] = {
                        'name': 'rect', 'x': 0, 'y': 0, 'width': starNum, 'height': starNum, 'transform': 'translate(0,0)',
                        'fill': backgroundColor, 'opacity': opacity
                    };
                    pathOptions[1] = {
                        'name': 'path',
                        'd': 'M15.913,18.59L10.762 12.842 5.613 18.75 8.291 11.422 0.325 9.91 8.154 8.33 5.337 0.91 10.488 6.658 15.637 0.75 12.959 8.078 20.925 9.59 13.096 11.17 z',
                        'stroke-width': 1,
                        'stroke': color,
                        'fill': color
                    };
                    break;
                case 'Triangle':
                    patternGroup[heightStr] = patternGroup[widthStr] = width;
                    pathOptions[0] = {
                        'name': 'rect', 'x': 0, 'y': 0, 'width': width, 'height': width, 'transform': 'translate(0,0)',
                        'fill': backgroundColor, 'opacity': opacity
                    };
                    pathOptions[1] = {
                        'name': 'path',
                        'd': 'M4.987,0L7.48 4.847 9.974 9.694 4.987 9.694 0 9.694 2.493 4.847 z',
                        'stroke-width': 1,
                        'stroke': color,
                        'fill': color
                    };
                    break;
                case 'Circle':
                    patternGroup[heightStr] = patternGroup[widthStr] = circleNum;
                    pathOptions[0] = {
                        'name': 'rect', 'x': 0, 'y': 0, 'width': circleNum, 'height': circleNum, 'transform': 'translate(0,0)',
                        'fill': backgroundColor, 'opacity': opacity
                    };
                    pathOptions[1] = {
                        'name': 'circle',
                        'cx': 5.125,
                        'cy': 3.875,
                        'r': 3.625,
                        'stroke-width': 1,
                        'fill': color
                    };
                    break;
                case 'Tile':
                    patternGroup[heightStr] = patternGroup[widthStr] = tileNum;
                    pathOptions[0] = {
                        'name': 'rect', 'x': 0, 'y': 0, 'width': tileNum, 'height': tileNum, 'transform': 'translate(0,0)',
                        'fill': backgroundColor, 'opacity': opacity
                    };
                    pathOptions[1] = { 'name': 'path', 'd': 'M0,9L0 0 9 0 z', 'stroke-width': strokeWidth, 'stroke': color, 'fill': color };
                    pathOptions[2] = { 'name': 'path', 'd': 'M9,9L9 0 18 0 z', 'stroke-width': strokeWidth, 'stroke': color, 'fill': color };
                    pathOptions[3] = { 'name': 'path', 'd': 'M0,18L0 9 9 9 z', 'stroke-width': strokeWidth, 'stroke': color, 'fill': color };
                    pathOptions[4] = { 'name': 'path', 'd': 'M9,18L9 9 18 9 z', 'stroke-width': strokeWidth, 'stroke': color, 'fill': color };
                    break;
                case 'HorizontalDash':
                    patternGroup[heightStr] = patternGroup[widthStr] = height;
                    pathOptions[0] = {
                        'name': 'rect', 'x': 0, 'y': 0, 'width': height, 'height': height, 'transform': 'translate(0,0)',
                        'fill': backgroundColor, 'opacity': opacity
                    };
                    pathOptions[1] = {
                        'name': 'path', 'd': 'M0,1.5 L10 1.5 M0,5.5 L10 5.5 M0,9.5 L10 9.5 z', 'stroke-width': 1,
                        'stroke': color, 'fill': color
                    };
                    break;
                case 'VerticalDash':
                    patternGroup[heightStr] = patternGroup[widthStr] = height;
                    pathOptions[0] = {
                        'name': 'rect', 'x': 0, 'y': 0, 'width': height, 'height': height, 'transform': 'translate(0,0)',
                        'fill': backgroundColor, 'opacity': opacity
                    };
                    pathOptions[1] = {
                        'name': 'path', 'd': 'M1.5,0 L1.5 10 M5.5,0 L5.5 10 M9.5,0 L9.5 10 z', 'stroke-width': 1,
                        'stroke': color, 'fill': color
                    };
                    break;
                case 'Rectangle':
                    patternGroup[heightStr] = patternGroup[widthStr] = height;
                    pathOptions[0] = { 'name': 'rect', 'width': height, 'height': height, 'fill': backgroundColor, 'opacity': opacity };
                    pathOptions[1] = { 'name': 'rect', 'x': 1, 'y': 2, 'width': 4, 'height': 9, 'fill': color, 'opacity': opacity };
                    pathOptions[2] = { 'name': 'rect', 'x': 7, 'y': 2, 'width': 4, 'height': 9, 'fill': color, 'opacity': opacity };
                    break;
                case 'Box':
                    patternGroup[heightStr] = patternGroup[widthStr] = width;
                    pathOptions[0] = { 'name': 'rect', 'width': 13, 'height': 13, 'fill': backgroundColor, 'opacity': opacity };
                    pathOptions[1] = {
                        'name': 'rect', 'x': 1.5, 'y': 1.5, 'width': width, 'height': 9, 'fill': color,
                        'opacity': opacity
                    };
                    break;
                case 'HorizontalStripe':
                    patternGroup[heightStr] = height;
                    patternGroup[widthStr] = width;
                    pathOptions[0] = {
                        'name': 'rect', 'x': 0, 'y': 0, 'width': width, 'height': height,
                        'transform': 'translate(0,0)', 'fill': backgroundColor, 'opacity': opacity
                    };
                    pathOptions[1] = {
                        'name': 'path', 'd': 'M0,0.5 L10 0.5 M0,4.5 L10 4.5 M0,8.5 L10 8.5 z', 'stroke-width': 1,
                        'stroke': color, 'fill': color
                    };
                    break;
                case 'VerticalStripe':
                    patternGroup[heightStr] = width;
                    patternGroup[widthStr] = height;
                    pathOptions[0] = {
                        'name': 'rect', 'x': 0, 'y': 0, 'width': height, 'height': width, 'transform': 'translate(0,0)',
                        'fill': backgroundColor, 'opacity': opacity
                    };
                    pathOptions[1] = {
                        'name': 'path', 'd': 'M0.5,0 L0.5 10 M4.5,0 L4.5 10 M8.5,0 L8.5 10 z', 'stroke-width': 1,
                        'stroke': color, 'fill': color
                    };
                    break;
                case 'Bubble':
                    patternGroup[heightStr] = patternGroup[widthStr] = bubNum;
                    pathOptions[0] = {
                        'name': 'rect', 'x': 0, 'y': 0, 'width': bubNum, 'height': bubNum, 'transform': 'translate(0,0)',
                        'fill': backgroundColor, 'opacity': opacity
                    };
                    pathOptions[1] = { 'name': 'circle', 'cx': 5.217, 'cy': 11.325, 'r': 3.429, 'stroke-width': 1, 'fill': '#D0A6D1' };
                    pathOptions[2] = { 'name': 'circle', 'cx': 13.328, 'cy': 6.24, 'r': 4.884, 'stroke-width': 1, 'fill': color };
                    pathOptions[3] = {
                        'name': 'circle', 'cx': 13.277, 'cy': 14.66, 'r': 3.018, 'stroke-width': 1,
                        'fill': '#D0A6D1'
                    };
                    break;
            }
            var svgRenderer = (chart.svgRenderer || chart.renderer);
            var pattern = svgRenderer.createPattern(patternGroup, 'pattern');
            this.loadPattern(chart, pathOptions, pattern, svgRenderer);
            svg.appendChild(pattern);
            return 'url(#' + chart.element.id + '_' + patternName + '_' + 'Selection' + '_' + index + ')';
        };
        BaseSelection.prototype.loadPattern = function (chart, options, pattern, svgRenderer) {
            var i;
            for (i = 0; i < options.length; i++) {
                var path = svgRenderer.createPattern(options[i], options[i].name);
                pattern.appendChild(path);
            }
        };
        BaseSelection.prototype.concatIndexes = function (userIndexes, localIndexes) {
            return userIndexes.concat(localIndexes);
        };
        BaseSelection.prototype.checkVisibility = function (selectedIndexes, chart) {
            if (chart === void 0) { chart = null; }
            if (!selectedIndexes) {
                return false;
            }
            var visible = false;
            var uniqueSeries = [];
            for (var _i = 0, selectedIndexes_1 = selectedIndexes; _i < selectedIndexes_1.length; _i++) {
                var index = selectedIndexes_1[_i];
                if (uniqueSeries.indexOf(index.series) === -1) {
                    uniqueSeries.push(index.series);
                }
            }
            for (var _a = 0, uniqueSeries_1 = uniqueSeries; _a < uniqueSeries_1.length; _a++) {
                var index = uniqueSeries_1[_a];
                if (chart != null && chart.rangeColorSettings && chart.rangeColorSettings.length > 0) {
                    if (this.control.series[0].visible) {
                        visible = true;
                        break;
                    }
                }
                else {
                    if (this.control.series[index].visible) {
                        visible = true;
                        break;
                    }
                }
            }
            return visible;
        };
        BaseSelection.prototype.addSvgClass = function (element, className) {
            var elementClassName = element.getAttribute('class') || '';
            elementClassName += ((elementClassName !== '') ? ' ' : '');
            if (elementClassName.indexOf(className) === -1) {
                element.setAttribute('class', elementClassName + className);
            }
        };
        BaseSelection.prototype.removeSvgClass = function (element, className) {
            var elementClassName = element.getAttribute('class') || '';
            if (elementClassName.indexOf(className) > -1) {
                element.setAttribute('class', elementClassName.replace(className, ''));
            }
        };
        BaseSelection.prototype.getChildren = function (parent) {
            var children = [];
            for (var i = 0; i < parent.childNodes.length; i++) {
                if (parent.childNodes[i].tagName !== 'defs') {
                    children.push(parent.childNodes[i]);
                }
            }
            return children;
        };
        return BaseSelection;
    }());
    exports.BaseSelection = BaseSelection;
});
