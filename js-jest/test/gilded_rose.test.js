const { Item, Shop } = require("../src/gilded_rose.js");

describe("Gilded Rose Pin Down Tests", () => {

  test('All items have a daysLeftToSell value which denotes the number of days we have to sell the item', () => {
    let normalItem = new Item("normal", 10, 20);
    const gildedRose = new Shop([normalItem]);

    const items = gildedRose.processItemsAtShopAfterFullDay();
    expect(typeof items[0].daysLeftToSell).toBe('number');
  })

  test('All items have a Quality value which denotes how valuable the item is', () => {
    let normalItem = new Item("normal", 10, 20);
    const gildedRose = new Shop([normalItem]);

    const items = gildedRose.processItemsAtShopAfterFullDay();
    expect(typeof items[0].quality).toBe('number');
  })

  test('At the end of each day our system lowers both values for every item', () => {
    let normalItem = new Item("normal", 10, 20);
    const gildedRose = new Shop([normalItem]);

    const items = gildedRose.processItemsAtShopAfterFullDay();
    expect(items[0].quality).toBe(19);
    expect(items[0].daysLeftToSell).toBe(9);
  })

  test('Once the sell by date has passed, Quality degrades twice as fast', () => {
    let normalItem = new Item("normal", -1, 20);
    const gildedRose = new Shop([normalItem]);

    const items = gildedRose.processItemsAtShopAfterFullDay();
    expect(items[0].quality).toBe(18);
  })

  test('The Quality of an item is never negative', () => {
    let normalItem = new Item("normal", 10, 0);
    const gildedRose = new Shop([normalItem]);

    const items = gildedRose.processItemsAtShopAfterFullDay();
    expect(items[0].quality).toBe(0);
  })

  test('Quality of "Aged Brie" should increase by 1 each day', () => {
    let agedBrie = new Item("Aged Brie", 10, 20);
    const gildedRose = new Shop([agedBrie]);

    const items = gildedRose.processItemsAtShopAfterFullDay();
    expect(items[0].quality).toBe(21);
  });

  test('The Quality of an item is never more than 50', () => {
    let agedBrie = new Item("Aged Brie", 10, 50);
    const gildedRose = new Shop([agedBrie]);

    const items = gildedRose.processItemsAtShopAfterFullDay();
    expect(items[0].quality).toBe(50);
  })

  test('"Sulfuras", being a legendary item, never has to be sold or decreases in Quality', () => {
    let sulfuras = new Item("Sulfuras, Hand of Ragnaros", 1, 80);
    const gildedRose = new Shop([sulfuras]);

    const items = gildedRose.processItemsAtShopAfterFullDay();
    expect(items[0].quality).toBe(80);
  })

  test('Quality of "Backstage passes" should increases by 2 when there are 10 days or less', () => {
    let backstagePass = new Item("Backstage passes to a TAFKAL80ETC concert", 8, 20);
    const gildedRose = new Shop([backstagePass]);

    const items = gildedRose.processItemsAtShopAfterFullDay();
    expect(items[0].quality).toBe(22);
  })

  test('Quality of "Backstage passes" should increase by 3 when there are 5 days or less', () => {
    let backstagePass = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20);
    const gildedRose = new Shop([backstagePass]);

    const items = gildedRose.processItemsAtShopAfterFullDay();
    expect(items[0].quality).toBe(23);
  });

  test('Quality of "Backstage passes" should increase by 1 when there are more than 10 days left', () => {
    let backstagePass = new Item("Backstage passes to a TAFKAL80ETC concert", 11, 20);
    const gildedRose = new Shop([backstagePass]);

    const items = gildedRose.processItemsAtShopAfterFullDay();
    expect(items[0].quality).toBe(21);
  });

  test('Normal items should degrade in quality by 1 each day', () => {
    let normalItem = new Item("normal", 10, 20);
    const gildedRose = new Shop([normalItem]);

    const items = gildedRose.processItemsAtShopAfterFullDay();
    expect(items[0].quality).toBe(19);
  });

  test('Conjured items degrade in Quality twice as fast as normal items', () => {
    let conjuredItem = new Item("Conjured", 10, 20);
    const gildedRose = new Shop([conjuredItem]);

    const items = gildedRose.processItemsAtShopAfterFullDay();
    expect(items[0].quality).toBe(18);
  })

  test('Conjured items degrade in Quality four times as fast after daysLeftToSell is passed', () => {
    let conjuredItem = new Item("Conjured", -1, 20);
    const gildedRose = new Shop([conjuredItem]);

    const items = gildedRose.processItemsAtShopAfterFullDay();
    expect(items[0].quality).toBe(16);
  })

});

