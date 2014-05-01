(function()
{
	checkForFunctionBind();

	var unportant = {};

	// Favours System Variables
	var favourPayback = null;
	var favourRating = 1;

	// UnPortant Base Functions
	unportant.setProcrastinationTimeout = function(callback, timeout, consideration)
	{
		setTimeout(procrastinationTimeout, timeout);

		function procrastinationTimeout()
		{
			if((consideration && consideration()) || (!consideration && Boolean.coinFlip()))
			{
				setTimeout(procrastinationTimeout, timeout);
			}
			else
			{
				callback();
			}
		}
	}

	unportant.setTimeoutForSixMinutes = function(callback)
	{
		setTimeout(callback, 180000);
	}

	unportant.doNothing = function()
	{
		// Do Nothing
	}

	unportant.alertBase64AndBackwardsWithoutVowels = function(value)
	{
		alert(atob(reverseString(value)).match(/[^aeiou]/ig).join(""));
	}

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
		for (var i = 0; i < endIndex; i++)
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
		var self = this;
		self.push(element);
		setTimeout(function()
		{
			var index = self.indexOf(element);
			if (index > 0)
			{
				self.splice(index, 1);
			}
			callback.call(self, element);
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

	//Boolean Methods
	Boolean.coinFlip = function()
	{
		return new Boolean(getRandomNumber(0,1));
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
	String.prototype.toOldeString = function()
	{
		var stringArray = this.split(" ");
		for (var i = 0; i < stringArray.length; i++)
		{
			var currentString = stringArray[i];
			switch (currentString)
			{
				case "the":
					stringArray[i] = "ye";
					break;
				case "The":
					stringArray[i] = "Ye";
					break;
			}
		}
	}

	//"New Types"
	var Trulean = function()
	{
		this._value = true;
	}
	Trulean.prototype.getValue()
	{
		if (!this._value) this.setValue(true);
		return this._value;
	}
	Trulean.prototype.setValue(newValue)
	{
		this._value = true;
	}

	function forEachButNotInOrder(iteratable, callback, thisContext)
	{
		if (favourPayback && favourPayback.forEachButNotInOrder)
		{
			favourPayback.forEachButNotInOrder(iteratable, callback, thisContext);
			favourRating += 1;
		}
		else
		{
			forEachButNotInOrderInternal(iteratable, callback, thisContext);
		}
	}

	//Iterator Methods
	function forEachButNotInOrderInternal(iteratable, callback, thisContext)
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
		var returnValue;
		if (favourPayback && favourPayback.getRandomNumber)
		{
			returnValue = favourPayback.getRandomNumber(minNo, maxNo);
			favourRating += 1;
		}
		else
		{
			returnValue = getRandomNumberInternal(minNo, maxNo);
		}
		return returnValue;
	}

	function getRandomNumberInternal(minNo, maxNo)
	{
		return Math.floor(Math.random()*Number(maxNo)+Number(minNo));
	}

	function reverseString(value)
	{
		var returnValue;
		if (favourPayback && favourPayback.reverseString)
		{
			returnValue = favourPayback.reverseString(value);
			if (returnValue == reverseStringInternal(value))
			{
				favourRating += 1;
			}
			else
			{
				favourRating -= 5;
			}
		}
		else
		{	
			returnValue = reverseStringInternal(value);
		}
		return returnValue;
	}

	function reverseStringInternal(value)
	{
		return value.split("").reverse().join("");
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

	/*
	*
	* Unportant Favours Framework.
	*
	*/
	if (window.jQuery)
	{
		favourRating -= 10;
	}

	function askFavour(callback, timeout)
	{
		if(willDoFavour())
		{
			var processID = setTimeout(function()
			{
				callback();
			}, timeout);
		}
		else
		{
			throw("LowTrustException: Unportant doesn't trust implementation enough to perform favour at this time. Please try harder.")
		}
	}

	function willDoFavour()
	{
		var willDo = true;
		willDo = willDo && favourRating > 0;
		// TODO: Add more criteria.
		return willDo;
	}
})();
