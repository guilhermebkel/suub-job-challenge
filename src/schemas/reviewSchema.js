reviewSchemaExample = '{' + '\n' +
    '"name"' + ': ' + '"Rodrigo"' + ',' + '\n' +
    '"date"' + ': ' + '"2016-12-12T18:25:43"' + ',' + '\n' +
    '"rating"' + ': ' + '4' + ',' + '\n' +
    '"comments"' + ': ' + '"Muito ráp_ida a entrega, mas é caro."' + ',' + '\n' +
    '"restaurant_id"' + ': ' + '"coffee-corner"' + '\n' + '}';

reviewSchema = '{' + '\n' +
    '"name"' + ': ' + '" "' + ',' + '\n' +
    '"date"' + ': ' + '" "' + ',' + '\n' +
    '"rating"' + ': ' + '0' + ',' + '\n' +
    '"comments"' + ': ' + '" "' + ',' + '\n' +
    '"restaurant_id"' + ': ' + '" "' + '\n' + '}';

module.exports = {
    reviewSchemaExample,
    reviewSchema
}