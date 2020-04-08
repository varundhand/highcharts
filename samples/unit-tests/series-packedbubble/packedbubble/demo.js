QUnit.test('Packed Bubble layouts operations', function (assert) {

    const chart = Highcharts.chart('container', {
        chart: {
            type: 'packedbubble',
            height: '100%'
        },
        title: false,
        plotOptions: {
            packedbubble: {
                layoutAlgorithm: {
                    enableSimulation: false,
                    splitSeries: true
                },
                dataLabels: {
                    enabled: false
                }
            }
        },
        series: [{
            allowParentSelect: true,
            data: []
        }, {
            allowParentSelect: true,
            data: []
        }, {
            data: []
        }, {
            data: []
        }]
    });

    chart.series[2].remove();

    function compareCollections(collections, collection) {
        var equal = true;

        collections.forEach(function (c) {
            if (equal) {
                equal = c.series.length === collection.length;
            }
        });

        return equal;
    }

    assert.strictEqual(
        compareCollections(chart.graphLayoutsLookup, chart.series),
        true,
        'Series is removed from layout.series collection.'
    );

    const controller = new TestController(chart);
    controller.click(
        (chart.series[0].parentNode.plotX) + chart.plotLeft,
        (chart.series[0].parentNode.plotY) + chart.plotTop,
        { shiftKey: false },
        false
    );

    assert.ok(
        chart.series[0].parentNode.selected,
        'It should be possible to select a parent node that has enabled allowParentSelect property'
    );

    controller.click(
        (chart.series[2].parentNode.plotX) + chart.plotLeft,
        (chart.series[2].parentNode.plotY) + chart.plotTop,
        { shiftKey: false },
        false
    );

    assert.notOk(
        chart.series[2].parentNode.selected,
        'It shouldn\'t be possible to select a parent that has not enabled allowParentSelect property.'
    );

    controller.click(
        (chart.series[1].parentNode.plotX) + chart.plotLeft,
        (chart.series[1].parentNode.plotY) + chart.plotTop,
        { shiftKey: false },
        false
    );

    assert.strictEqual(
        chart.series[0].getSelectedParents().length,
        1,
        'It shouldn\'t be possible to select more than one parent node without using key modifier.'
    );

    controller.click(
        (chart.series[0].parentNode.plotX) + chart.plotLeft,
        (chart.series[0].parentNode.plotY) + chart.plotTop,
        { shiftKey: true },
        false
    );

    assert.strictEqual(
        chart.series[0].getSelectedParents().length,
        2,
        'It should be possible to select more than one parent node using key modifier.'
    );

    controller.click(
        (chart.series[0].parentNode.plotX) + chart.plotLeft,
        (chart.series[0].parentNode.plotY) + chart.plotTop,
        { shiftKey: false },
        false
    );

    assert.strictEqual(
        chart.series[0].getSelectedParents().length,
        0,
        'After clicking on the selected parent, all selected parents should be deselected.'
    );

});