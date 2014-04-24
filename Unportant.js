(function()
{
	checkForFunctionBind();

	var unportant = {};

	// Extensions
	// Array Methods
	Array.prototype.forSome = function(callback, thisContext)
	{
		var endIndex = getRandomNumber(0, this.length);
		for (var i = 0; i < endIndex; i++)
		{
			callback.call(thisContext, this[i], i, this);
		}
	}
	Array.prototype.forMost = function(callback, thisContext)
	{
		var startIndex = Math.floor(this.length / 2);
		var endIndex = getRandomNumber(startIndex, this.length);
		for (var i = startIndex; i < endIndex; i++)
		{
			callback.call(thisContext, this[i], i, this);
		}
	}
	Array.prototype.forEveryOther = function(callback, thisContext, startIndex)
	{
		for (var i = startIndex ? startIndex : 0; i < this.length; i += 2)
		{
			callback.call(thisContext, this[i], i, this);
		}
	}
	Array.prototype.pushItemWithLifespanOfTwoMinutes = function(element, callback)
	{
		this.push(element);
		setTimeout(function()
		{
			var index = this.indexOf(element);
			if (index > 0)
			{
				this.splice(index, 1);
			}
			callback.call(this, element);
		}, 120000);
	}
	Array.prototype.forEachButNotInOrder = function(callback, thisContext)
	{
		forEachButNotInOrder(this, callback, thisContext);
	}
	Array.prototype.dropAFewAtRandom = function()
	{
		var numberToDrop = getRandomNumber(1, this.length);
		for (var i = 0; i < numberToDrop; i++)
		{
			this.splice(getRandomNumber(0, this.length-1),1);
		}
		return this;
	}
	Array.prototype.jumble = function()
	{
		var newArray = this.slice(0);
		for (var i = 0; i < this.length; i++)
		{
			this[i] = newArray.splice(getRandomNumber(0, newArray.length-1), 1)[0];
		}
		return this;
	}

	// String Methods
	String.prototype.throwVowels = function()
	{
		throw this.match(/[aeiou]/ig).join("");
	}
	String.prototype.addJam = function()
	{
		return this + " and jam";
	}

	//Iterator Methods
	function forEachButNotInOrder(iteratable, callback, thisContext)
	{
		var numberArray = new Array();
		for (var i = 0; i < iteratable.length; i++)
		{
			numberArray.push(i);
		}
		numberArray.jumble();
		//element,index,array
		for (var i = 0; i < iteratable.length; i++)
		{
			callback.call(thisContext, iteratable[numberArray[i]], numberArray[i], iteratable);
		}
	}

	// Utility Methods
	function getRandomNumber(minNo, maxNo)
	{
		return Math.floor(Math.random()*Number(maxNo)+Number(minNo));
	}

	function checkForFunctionBind()
	{
		//Shim from MDN
		if (!Function.prototype.bind)
		{
			Function.prototype.bind = function( oThis ) 
			{ 
				if (typeof this !== "function") 
				{
					// closest thing possible to the ECMAScript 5 internal
					// IsCallable function
					throw new TypeError( "Function.prototype.bind - what is trying to be bound is not callable" );
				}
		 
				var fSlice = Array.prototype.slice,
					aArgs = fSlice.call( arguments, 1 ),
					fToBind = this,
					fNOP = function() {},
					fBound = function() 
					{
						return fToBind.apply( this instanceof fNOP
							? this
							: oThis || window,
							aArgs.concat( fSlice.call( arguments ) ) );
					};
		 
				fNOP.prototype = this.prototype;
		 
				fBound.prototype = new fNOP();
		 
				return fBound;
			};
		}
	}

	window.unportant = unportant;
})();
