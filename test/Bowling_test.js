// jasmine test
// this test requires a BowlingCtrl

describe('Bowling controllers', function() {
 
  describe('BowlingCtrl', function(){
 
    it('should create "players" model with 0 players', function() {
      var scope = {},
      ctrl = new BowlingCtrl(scope);
      expect(scope.game.players.length).toBe(0);
    });
    it('should add "players" ', function() {
      var scope = {},
      ctrl = new BowlingCtrl(scope);

      scope.game.addPlayer("Player1");
      expect(scope.game.players.length).toBe(1);
      
      scope.game.addPlayer("Player2");
      expect(scope.game.players.length).toBe(2);

    });

  });
});

describe("Players",function(){
	it("should update the standing pin correctly ",function(){
		
		var player  = new Player("Player1");

		// cannot knot up pin
		expect(function() { player.roll(-1); }).toThrow("Invalid number of pin");
		expect(function() { player.roll(12); }).toThrow("Invalid number of pin");

		expect(player.standingPin()).toBe(10);
		expect(player.currentFrame()).toBe(0);
		expect(player.currentChance()).toBe(0);

		player.roll(3);
		expect(player.standingPin()).toBe(7);
		expect(player.currentFrame()).toBe(0);
		expect(player.currentChance()).toBe(1);

		// cannot knot down more  pin than available
		expect(function() { player.roll(8); }).toThrow();

		player.roll(3);
		expect(player.standingPin()).toBe(10);
		expect(player.currentFrame()).toBe(1);
		expect(player.currentChance()).toBe(0);


		// now a strike
		player.roll(10);
		expect(player.standingPin()).toBe(10);
		expect(player.currentFrame()).toBe(2);
		expect(player.currentChance()).toBe(0);

	});
	
	it("should have a score of zero if ball has gone",function(){

		var i;
		var player  = new Player("Player1");
		for (i =0 ;  i < 20 ; i++ ) {
			player.roll(0);
		}
		expect(player.score()).toBe(0);
		expect(player.round).toBe(20);

	});
	it("should have a score of 300 with only strikes",function(){

		var player  = new Player("Player1");
		for (var i =0;i<9;i++) {
			expect(player.currentFrame()).toBe(i);
			player.roll(10);
		}
		// now play last frame
        expect(player.currentFrame()).toBe(9);
        expect(player.currentChance()).toBe(0);
		player.roll(10);
        expect(player.currentFrame()).toBe(9);
        expect(player.currentChance()).toBe(1);
		player.roll(10);
        expect(player.currentFrame()).toBe(9);
        expect(player.currentChance()).toBe(2);
		player.roll(10);

		expect(player.frameIsStrike(0)).toBe(true);
		expect(player.frameIsStrike(1)).toBe(true);
		expect(player.frameIsStrike(2)).toBe(true);
		expect(player.frameIsStrike(3)).toBe(true);
		expect(player.frameIsStrike(4)).toBe(true);
		expect(player.frameIsStrike(5)).toBe(true);
		expect(player.frameIsStrike(6)).toBe(true);
		expect(player.frameIsStrike(7)).toBe(true);
		expect(player.frameIsStrike(8)).toBe(true);
		expect(player.frameIsStrike(9)).toBe(true);
		expect(player.frameIsStrike(10)).toBe(true);

		expect(player.score()).toBe(300);

	});

	it("should have a score of 20 if one pin has been hit each roll",function(){

		var player  = new Player("Player1");
		expect(player.name).toBe("Player1");
		for (var i = 0 ; i < 20 ; i++ ) {
			player.roll(1);
		}
		expect(player.score()).toBe(20);

	});
	it("should have a score of 20 if a spare then 2 and 4 then nothing",function(){

		var player  = new Player("Player1");
		expect(player.name).toBe("Player1");

		player.roll(7);
		player.roll(3);

		player.roll(2);
		player.roll(4);
		
		expect(player.frameIsStrike(0)).toBe(false);
		expect(player.frameIsSpare(0)).toBe(true);

		expect(player.frameIsStrike(1)).toBe(false);
		expect(player.frameIsSpare(1)).toBe(false);

		for (var i = 0 ; i < 16 ; i++ ) {
			player.roll(0);
		}
		expect(player.score()).toBe(20);

	});	
	
	