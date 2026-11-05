// ../../node_modules/.pnpm/parse5@8.0.1/node_modules/parse5/dist/common/unicode.js
const UNDEFINED_CODE_POINTS = /* @__PURE__ */ new Set([
	65534,
	65535,
	131070,
	131071,
	196606,
	196607,
	262142,
	262143,
	327678,
	327679,
	393214,
	393215,
	458750,
	458751,
	524286,
	524287,
	589822,
	589823,
	655358,
	655359,
	720894,
	720895,
	786430,
	786431,
	851966,
	851967,
	917502,
	917503,
	983038,
	983039,
	1048574,
	1048575,
	1114110,
	1114111
]);
var CODE_POINTS;
(function(CODE_POINTS) {
	CODE_POINTS[CODE_POINTS["EOF"] = -1] = "EOF";
	CODE_POINTS[CODE_POINTS["NULL"] = 0] = "NULL";
	CODE_POINTS[CODE_POINTS["TABULATION"] = 9] = "TABULATION";
	CODE_POINTS[CODE_POINTS["CARRIAGE_RETURN"] = 13] = "CARRIAGE_RETURN";
	CODE_POINTS[CODE_POINTS["LINE_FEED"] = 10] = "LINE_FEED";
	CODE_POINTS[CODE_POINTS["FORM_FEED"] = 12] = "FORM_FEED";
	CODE_POINTS[CODE_POINTS["SPACE"] = 32] = "SPACE";
	CODE_POINTS[CODE_POINTS["EXCLAMATION_MARK"] = 33] = "EXCLAMATION_MARK";
	CODE_POINTS[CODE_POINTS["QUOTATION_MARK"] = 34] = "QUOTATION_MARK";
	CODE_POINTS[CODE_POINTS["AMPERSAND"] = 38] = "AMPERSAND";
	CODE_POINTS[CODE_POINTS["APOSTROPHE"] = 39] = "APOSTROPHE";
	CODE_POINTS[CODE_POINTS["HYPHEN_MINUS"] = 45] = "HYPHEN_MINUS";
	CODE_POINTS[CODE_POINTS["SOLIDUS"] = 47] = "SOLIDUS";
	CODE_POINTS[CODE_POINTS["DIGIT_0"] = 48] = "DIGIT_0";
	CODE_POINTS[CODE_POINTS["DIGIT_9"] = 57] = "DIGIT_9";
	CODE_POINTS[CODE_POINTS["SEMICOLON"] = 59] = "SEMICOLON";
	CODE_POINTS[CODE_POINTS["LESS_THAN_SIGN"] = 60] = "LESS_THAN_SIGN";
	CODE_POINTS[CODE_POINTS["EQUALS_SIGN"] = 61] = "EQUALS_SIGN";
	CODE_POINTS[CODE_POINTS["GREATER_THAN_SIGN"] = 62] = "GREATER_THAN_SIGN";
	CODE_POINTS[CODE_POINTS["QUESTION_MARK"] = 63] = "QUESTION_MARK";
	CODE_POINTS[CODE_POINTS["LATIN_CAPITAL_A"] = 65] = "LATIN_CAPITAL_A";
	CODE_POINTS[CODE_POINTS["LATIN_CAPITAL_Z"] = 90] = "LATIN_CAPITAL_Z";
	CODE_POINTS[CODE_POINTS["RIGHT_SQUARE_BRACKET"] = 93] = "RIGHT_SQUARE_BRACKET";
	CODE_POINTS[CODE_POINTS["GRAVE_ACCENT"] = 96] = "GRAVE_ACCENT";
	CODE_POINTS[CODE_POINTS["LATIN_SMALL_A"] = 97] = "LATIN_SMALL_A";
	CODE_POINTS[CODE_POINTS["LATIN_SMALL_Z"] = 122] = "LATIN_SMALL_Z";
})(CODE_POINTS || (CODE_POINTS = {}));
const SEQUENCES = {
	DASH_DASH: "--",
	CDATA_START: "[CDATA[",
	DOCTYPE: "doctype",
	SCRIPT: "script",
	PUBLIC: "public",
	SYSTEM: "system"
};
function isSurrogate(cp) {
	return cp >= 55296 && cp <= 57343;
}
function isSurrogatePair(cp) {
	return cp >= 56320 && cp <= 57343;
}
function getSurrogatePairCodePoint(cp1, cp2) {
	return (cp1 - 55296) * 1024 + 9216 + cp2;
}
function isControlCodePoint(cp) {
	return cp !== 32 && cp !== 10 && cp !== 13 && cp !== 9 && cp !== 12 && cp >= 1 && cp <= 31 || cp >= 127 && cp <= 159;
}
function isUndefinedCodePoint(cp) {
	return cp >= 64976 && cp <= 65007 || UNDEFINED_CODE_POINTS.has(cp);
}
// ../../node_modules/.pnpm/parse5@8.0.1/node_modules/parse5/dist/common/error-codes.js
var ERR;
(function(ERR) {
	ERR["controlCharacterInInputStream"] = "control-character-in-input-stream";
	ERR["noncharacterInInputStream"] = "noncharacter-in-input-stream";
	ERR["surrogateInInputStream"] = "surrogate-in-input-stream";
	ERR["nonVoidHtmlElementStartTagWithTrailingSolidus"] = "non-void-html-element-start-tag-with-trailing-solidus";
	ERR["endTagWithAttributes"] = "end-tag-with-attributes";
	ERR["endTagWithTrailingSolidus"] = "end-tag-with-trailing-solidus";
	ERR["unexpectedSolidusInTag"] = "unexpected-solidus-in-tag";
	ERR["unexpectedNullCharacter"] = "unexpected-null-character";
	ERR["unexpectedQuestionMarkInsteadOfTagName"] = "unexpected-question-mark-instead-of-tag-name";
	ERR["invalidFirstCharacterOfTagName"] = "invalid-first-character-of-tag-name";
	ERR["unexpectedEqualsSignBeforeAttributeName"] = "unexpected-equals-sign-before-attribute-name";
	ERR["missingEndTagName"] = "missing-end-tag-name";
	ERR["unexpectedCharacterInAttributeName"] = "unexpected-character-in-attribute-name";
	ERR["unknownNamedCharacterReference"] = "unknown-named-character-reference";
	ERR["missingSemicolonAfterCharacterReference"] = "missing-semicolon-after-character-reference";
	ERR["unexpectedCharacterAfterDoctypeSystemIdentifier"] = "unexpected-character-after-doctype-system-identifier";
	ERR["unexpectedCharacterInUnquotedAttributeValue"] = "unexpected-character-in-unquoted-attribute-value";
	ERR["eofBeforeTagName"] = "eof-before-tag-name";
	ERR["eofInTag"] = "eof-in-tag";
	ERR["missingAttributeValue"] = "missing-attribute-value";
	ERR["missingWhitespaceBetweenAttributes"] = "missing-whitespace-between-attributes";
	ERR["missingWhitespaceAfterDoctypePublicKeyword"] = "missing-whitespace-after-doctype-public-keyword";
	ERR["missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers"] = "missing-whitespace-between-doctype-public-and-system-identifiers";
	ERR["missingWhitespaceAfterDoctypeSystemKeyword"] = "missing-whitespace-after-doctype-system-keyword";
	ERR["missingQuoteBeforeDoctypePublicIdentifier"] = "missing-quote-before-doctype-public-identifier";
	ERR["missingQuoteBeforeDoctypeSystemIdentifier"] = "missing-quote-before-doctype-system-identifier";
	ERR["missingDoctypePublicIdentifier"] = "missing-doctype-public-identifier";
	ERR["missingDoctypeSystemIdentifier"] = "missing-doctype-system-identifier";
	ERR["abruptDoctypePublicIdentifier"] = "abrupt-doctype-public-identifier";
	ERR["abruptDoctypeSystemIdentifier"] = "abrupt-doctype-system-identifier";
	ERR["cdataInHtmlContent"] = "cdata-in-html-content";
	ERR["incorrectlyOpenedComment"] = "incorrectly-opened-comment";
	ERR["eofInScriptHtmlCommentLikeText"] = "eof-in-script-html-comment-like-text";
	ERR["eofInDoctype"] = "eof-in-doctype";
	ERR["nestedComment"] = "nested-comment";
	ERR["abruptClosingOfEmptyComment"] = "abrupt-closing-of-empty-comment";
	ERR["eofInComment"] = "eof-in-comment";
	ERR["incorrectlyClosedComment"] = "incorrectly-closed-comment";
	ERR["eofInCdata"] = "eof-in-cdata";
	ERR["absenceOfDigitsInNumericCharacterReference"] = "absence-of-digits-in-numeric-character-reference";
	ERR["nullCharacterReference"] = "null-character-reference";
	ERR["surrogateCharacterReference"] = "surrogate-character-reference";
	ERR["characterReferenceOutsideUnicodeRange"] = "character-reference-outside-unicode-range";
	ERR["controlCharacterReference"] = "control-character-reference";
	ERR["noncharacterCharacterReference"] = "noncharacter-character-reference";
	ERR["missingWhitespaceBeforeDoctypeName"] = "missing-whitespace-before-doctype-name";
	ERR["missingDoctypeName"] = "missing-doctype-name";
	ERR["invalidCharacterSequenceAfterDoctypeName"] = "invalid-character-sequence-after-doctype-name";
	ERR["duplicateAttribute"] = "duplicate-attribute";
	ERR["nonConformingDoctype"] = "non-conforming-doctype";
	ERR["missingDoctype"] = "missing-doctype";
	ERR["misplacedDoctype"] = "misplaced-doctype";
	ERR["endTagWithoutMatchingOpenElement"] = "end-tag-without-matching-open-element";
	ERR["closingOfElementWithOpenChildElements"] = "closing-of-element-with-open-child-elements";
	ERR["disallowedContentInNoscriptInHead"] = "disallowed-content-in-noscript-in-head";
	ERR["openElementsLeftAfterEof"] = "open-elements-left-after-eof";
	ERR["abandonedHeadElementChild"] = "abandoned-head-element-child";
	ERR["misplacedStartTagForHeadElement"] = "misplaced-start-tag-for-head-element";
	ERR["nestedNoscriptInHead"] = "nested-noscript-in-head";
	ERR["eofInElementThatCanContainOnlyText"] = "eof-in-element-that-can-contain-only-text";
})(ERR || (ERR = {}));
// ../../node_modules/.pnpm/parse5@8.0.1/node_modules/parse5/dist/tokenizer/preprocessor.js
const DEFAULT_BUFFER_WATERLINE = 65536;
var Preprocessor = class {
	constructor(handler) {
		this.handler = handler;
		this.html = "";
		this.pos = -1;
		this.lastGapPos = -2;
		this.gapStack = [];
		this.skipNextNewLine = false;
		this.lastChunkWritten = false;
		this.endOfChunkHit = false;
		this.bufferWaterline = DEFAULT_BUFFER_WATERLINE;
		this.isEol = false;
		this.lineStartPos = 0;
		this.droppedBufferSize = 0;
		this.line = 1;
		this.lastErrOffset = -1;
	}
	/** The column on the current line. If we just saw a gap (eg. a surrogate pair), return the index before. */
	get col() {
		return this.pos - this.lineStartPos + Number(this.lastGapPos !== this.pos);
	}
	get offset() {
		return this.droppedBufferSize + this.pos;
	}
	getError(code, cpOffset) {
		const { line, col, offset } = this;
		const startCol = col + cpOffset;
		const startOffset = offset + cpOffset;
		return {
			code,
			startLine: line,
			endLine: line,
			startCol,
			endCol: startCol,
			startOffset,
			endOffset: startOffset
		};
	}
	_err(code) {
		if (this.handler.onParseError && this.lastErrOffset !== this.offset) {
			this.lastErrOffset = this.offset;
			this.handler.onParseError(this.getError(code, 0));
		}
	}
	_addGap() {
		this.gapStack.push(this.lastGapPos);
		this.lastGapPos = this.pos;
	}
	_processSurrogate(cp) {
		if (this.pos !== this.html.length - 1) {
			const nextCp = this.html.charCodeAt(this.pos + 1);
			if (isSurrogatePair(nextCp)) {
				this.pos++;
				this._addGap();
				return getSurrogatePairCodePoint(cp, nextCp);
			}
		} else if (!this.lastChunkWritten) {
			this.endOfChunkHit = true;
			return CODE_POINTS.EOF;
		}
		this._err(ERR.surrogateInInputStream);
		return cp;
	}
	willDropParsedChunk() {
		return this.pos > this.bufferWaterline;
	}
	dropParsedChunk() {
		if (this.willDropParsedChunk()) {
			this.html = this.html.substring(this.pos);
			this.lineStartPos -= this.pos;
			this.droppedBufferSize += this.pos;
			this.pos = 0;
			this.lastGapPos = -2;
			this.gapStack.length = 0;
		}
	}
	write(chunk, isLastChunk) {
		if (this.html.length > 0) this.html += chunk;
		else this.html = chunk;
		this.endOfChunkHit = false;
		this.lastChunkWritten = isLastChunk;
	}
	insertHtmlAtCurrentPos(chunk) {
		this.html = this.html.substring(0, this.pos + 1) + chunk + this.html.substring(this.pos + 1);
		this.endOfChunkHit = false;
	}
	startsWith(pattern, caseSensitive) {
		if (this.pos + pattern.length > this.html.length) {
			this.endOfChunkHit = !this.lastChunkWritten;
			return false;
		}
		if (caseSensitive) return this.html.startsWith(pattern, this.pos);
		for (let i = 0; i < pattern.length; i++) if ((this.html.charCodeAt(this.pos + i) | 32) !== pattern.charCodeAt(i)) return false;
		return true;
	}
	peek(offset) {
		const pos = this.pos + offset;
		if (pos >= this.html.length) {
			this.endOfChunkHit = !this.lastChunkWritten;
			return CODE_POINTS.EOF;
		}
		const code = this.html.charCodeAt(pos);
		return code === CODE_POINTS.CARRIAGE_RETURN ? CODE_POINTS.LINE_FEED : code;
	}
	advance() {
		this.pos++;
		if (this.isEol) {
			this.isEol = false;
			this.line++;
			this.lineStartPos = this.pos;
		}
		if (this.pos >= this.html.length) {
			this.endOfChunkHit = !this.lastChunkWritten;
			return CODE_POINTS.EOF;
		}
		let cp = this.html.charCodeAt(this.pos);
		if (cp === CODE_POINTS.CARRIAGE_RETURN) {
			this.isEol = true;
			this.skipNextNewLine = true;
			return CODE_POINTS.LINE_FEED;
		}
		if (cp === CODE_POINTS.LINE_FEED) {
			this.isEol = true;
			if (this.skipNextNewLine) {
				this.line--;
				this.skipNextNewLine = false;
				this._addGap();
				return this.advance();
			}
		}
		this.skipNextNewLine = false;
		if (isSurrogate(cp)) cp = this._processSurrogate(cp);
		if (!(this.handler.onParseError === null || cp > 31 && cp < 127 || cp === CODE_POINTS.LINE_FEED || cp === CODE_POINTS.CARRIAGE_RETURN || cp > 159 && cp < 64976)) this._checkForProblematicCharacters(cp);
		return cp;
	}
	_checkForProblematicCharacters(cp) {
		if (isControlCodePoint(cp)) this._err(ERR.controlCharacterInInputStream);
		else if (isUndefinedCodePoint(cp)) this._err(ERR.noncharacterInInputStream);
	}
	retreat(count) {
		this.pos -= count;
		while (this.pos < this.lastGapPos) {
			this.lastGapPos = this.gapStack.pop();
			this.pos--;
		}
		this.isEol = false;
	}
};
// ../../node_modules/.pnpm/parse5@8.0.1/node_modules/parse5/dist/common/token.js
var TokenType;
(function(TokenType) {
	TokenType[TokenType["CHARACTER"] = 0] = "CHARACTER";
	TokenType[TokenType["NULL_CHARACTER"] = 1] = "NULL_CHARACTER";
	TokenType[TokenType["WHITESPACE_CHARACTER"] = 2] = "WHITESPACE_CHARACTER";
	TokenType[TokenType["START_TAG"] = 3] = "START_TAG";
	TokenType[TokenType["END_TAG"] = 4] = "END_TAG";
	TokenType[TokenType["COMMENT"] = 5] = "COMMENT";
	TokenType[TokenType["DOCTYPE"] = 6] = "DOCTYPE";
	TokenType[TokenType["EOF"] = 7] = "EOF";
	TokenType[TokenType["HIBERNATION"] = 8] = "HIBERNATION";
})(TokenType || (TokenType = {}));
function getTokenAttr(token, attrName) {
	for (let i = token.attrs.length - 1; i >= 0; i--) if (token.attrs[i].name === attrName) return token.attrs[i].value;
	return null;
}
// ../../node_modules/.pnpm/entities@8.1.0/node_modules/entities/dist/decode-codepoint.js
/**
* C1 Unicode control character reference replacements (code points 128–159).
* Index i gives the replacement for code point 128+i; 0 means "no replacement".
*/
const c1 = [
	8364,
	0,
	8218,
	402,
	8222,
	8230,
	8224,
	8225,
	710,
	8240,
	352,
	8249,
	338,
	0,
	381,
	0,
	0,
	8216,
	8217,
	8220,
	8221,
	8226,
	8211,
	8212,
	732,
	8482,
	353,
	8250,
	339,
	0,
	382,
	376
];
/**
* True for NUL, UTF-16 surrogates, and values past U+10FFFF.
* @param codePoint Unicode code point to check.
*/
function isInvalidCodePoint(codePoint) {
	return codePoint === 0 || codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111;
}
/**
* Replace the given code point with U+FFFD if it is NUL (0), a surrogate, or
* outside the valid Unicode range. Code points in the C1 controls range
* (128–159) are remapped to their Windows-1252 equivalents, following the
* HTML spec. All other code points are returned unchanged.
* @param codePoint Unicode code point to convert.
*/
function replaceCodePoint(codePoint) {
	if (isInvalidCodePoint(codePoint)) return 65533;
	if (codePoint >= 128 && codePoint <= 159) return c1[codePoint - 128] || codePoint;
	return codePoint;
}
/**
* XML numeric character references are the referenced Unicode code point.
* Invalid values still become U+FFFD; the HTML Windows-1252 C1 remap is not
* applied.
* @see https://www.w3.org/TR/xml/#NT-CharRef
* @param codePoint Unicode code point to convert.
*/
function replaceCodePointXML(codePoint) {
	return isInvalidCodePoint(codePoint) ? 65533 : codePoint;
}
// ../../node_modules/.pnpm/entities@8.1.0/node_modules/entities/dist/internal/decode-shared.js
const BASE91_INVERSE = /* #__PURE__ */ (() => {
	const table = /* @__PURE__ */ new Uint8Array(127);
	let code = 0;
	for (let char = 33; char <= 126; char++) if (char !== 34 && char !== 36 && char !== 92) table[char] = code++;
	return table;
})();
/**
* Decode a dictionary-encoded trie string back into its Uint16Array.
*
* Stream layout (consumed in this order):
*   1. dict1 atoms — `dict1AtomCount` uint16 values, delta+RLE encoded.
*   2. dict2 atoms — `atomCount - dict1AtomCount` values, delta+RLE.
*   3. dict2 ngrams — `ngramCount - (dictSize - dict1AtomCount)` entries,
*      each a pair of slot codes that resolve to earlier slots.
*   4. dict1 ngrams — `dictSize - dict1AtomCount` entries, same shape.
*   5. data — slot codes, each expanding to one or more uint16 values.
*
* Codes use a 91-char base (printable ASCII minus `"`, `$`, `\`):
*   - char1 < dictSize  → 1-char code, slot = char1
*   - char1 ≥ dictSize  → 2-char code, slot = dictSize + (char1 - dictSize)*91 + char2
*
* Slot index → token kind:
*   [0, A)                  dict1 atoms     (1-char codes)
*   [A, dictSize)           dict1 ngrams    (1-char codes)
*   [dictSize, dictSize+D)  dict2 atoms     (2-char codes)
*   [dictSize+D, end)       dict2 ngrams    (2-char codes)
*
* Both atom dicts decode before any ngram, and dict2 ngrams decode before
* dict1 ngrams. So every ngram entry references slots whose contents are
* already filled — no forward references to handle.
*
* This runs on library import. Flat typed arrays store each slot as either
* a plain value (`single`, covering every atom) or a range in a shared
* `pool` (ngrams).
* @param input Packed trie string.
* @param resultLength Expected number of uint16 values in the output.
* @param atomCount Total number of distinct uint16 values in the trie.
* @param dict1AtomCount Atoms in the 1-char range (`A` above).
* @param ngramCount Total number of ngram entries (dict1 + dict2).
* @param dictSize Number of 1-char code slots; the rest of `BASE - dictSize`
*   first-byte values are 2-char codes.
*/
function decodeTrieDict(input, resultLength, atomCount, dict1AtomCount, ngramCount, dictSize) {
	const base = 91;
	const inputLength = input.length;
	const twoCharBias = dictSize * 90;
	let pos = 0;
	/** Read one slot code at `pos` and return its slot index, advancing pos. */
	const readSlotCode = () => {
		const c1 = BASE91_INVERSE[input.charCodeAt(pos++)];
		return c1 < dictSize ? c1 : c1 * base - twoCharBias + BASE91_INVERSE[input.charCodeAt(pos++)];
	};
	const dict2AtomCount = atomCount - dict1AtomCount;
	const slotCount = atomCount + ngramCount;
	const single = new Int32Array(slotCount);
	single.fill(-1, dict1AtomCount, dictSize);
	single.fill(-1, dictSize + dict2AtomCount, slotCount);
	const start = new Int32Array(slotCount);
	const length = new Int32Array(slotCount);
	/**
	* Decode `count` ascending uint16 values from a delta+RLE stream into
	* `single[off..off+count)`.
	*
	*   code < 89   → delta = code
	*   code == 89  → run-length: next char encodes runLength-2; emit `runLength` consecutive +1 values
	*   code == 90, next < 90  → escape: delta = 89 + next * BASE + after-next
	*   code == 90, next == 90 → double-escape: extra char for very large deltas
	* @param count
	* @param off
	*/
	function decodeDelta(count, off) {
		let previous = 0;
		let slot = off;
		const end = off + count;
		while (slot < end) {
			const code = BASE91_INVERSE[input.charCodeAt(pos++)];
			if (code < 89) {
				previous += code;
				single[slot++] = previous;
			} else if (code === 89) {
				let runLength = BASE91_INVERSE[input.charCodeAt(pos++)] + 2;
				while (runLength--) single[slot++] = ++previous;
			} else {
				const next = BASE91_INVERSE[input.charCodeAt(pos++)];
				previous += 89 + (next < 90 ? next * base + BASE91_INVERSE[input.charCodeAt(pos++)] : BASE91_INVERSE[input.charCodeAt(pos++)] * 8281 + BASE91_INVERSE[input.charCodeAt(pos++)] * base + BASE91_INVERSE[input.charCodeAt(pos++)]);
				single[slot++] = previous;
			}
		}
	}
	decodeDelta(dict1AtomCount, 0);
	decodeDelta(dict2AtomCount, dictSize);
	const references = new Int32Array(ngramCount * 2);
	let poolSize = 0;
	let ngramIndex = 0;
	/**
	* Read `count` ngram entries (each = 2 slot-code references) for the slots
	* starting at `startSlot`, recording references and assigning pool ranges.
	* @param count
	* @param startSlot
	*/
	function readNgramReferences(count, startSlot) {
		for (let index = 0; index < count; index++) {
			const slot = startSlot + index;
			const a = readSlotCode();
			const b = readSlotCode();
			references[ngramIndex * 2] = a;
			references[ngramIndex * 2 + 1] = b;
			ngramIndex += 1;
			start[slot] = poolSize;
			const entryLength = (single[a] < 0 ? length[a] : 1) + (single[b] < 0 ? length[b] : 1);
			length[slot] = entryLength;
			poolSize += entryLength;
		}
	}
	readNgramReferences(ngramCount - dictSize + dict1AtomCount, dictSize + dict2AtomCount);
	readNgramReferences(dictSize - dict1AtomCount, dict1AtomCount);
	const pool = new Uint16Array(poolSize);
	let write = 0;
	for (let index = 0; index < ngramIndex; index++) for (let half = 0; half < 2; half++) {
		const source = references[index * 2 + half];
		const value = single[source];
		if (value < 0) {
			let read = start[source];
			const readEnd = read + length[source];
			while (read < readEnd) pool[write++] = pool[read++];
		} else pool[write++] = value;
	}
	const out = new Uint16Array(resultLength);
	let outIndex = 0;
	while (pos < inputLength) {
		let slot = BASE91_INVERSE[input.charCodeAt(pos++)];
		if (slot >= dictSize) slot = slot * base - twoCharBias + BASE91_INVERSE[input.charCodeAt(pos++)];
		const value = single[slot];
		if (value < 0) {
			let read = start[slot];
			const readEnd = read + length[slot];
			while (read < readEnd) out[outIndex++] = pool[read++];
		} else out[outIndex++] = value;
	}
	return out;
}
// ../../node_modules/.pnpm/entities@8.1.0/node_modules/entities/dist/generated/decode-data-html.js
/** Packed HTML decode trie data. */
const htmlDecodeTree = /* #__PURE__ */ decodeTrieDict("!}.&u%}'&}*'~!6*)%&,~!J~!J~%L~y<~!R,~~%Lu~~#GD~~#|)1#%}^%}2%+#.##%##%}&%##%'#%##&%#%#'%#&#%#&#'#%%#&#%##%#)%''%&%#%#'%#%%#%%}%%%#%#&(23#%%#&-%0%('1#(##%#'##+%'*.:1}#%#6-+(%'%%#%%%}#L'2351&('%}&/N'(0(/*-%(%%}#'+&T%7.2}#&%&#%#36/5##%&%%#&#%%#))2%%##%&&'0~!#*+&'%1~!%).'3q?&%'1~!.##%6(~!+%%%(Gw'rT~!E#<nA%#jZ~!H%(~!42##~!*31&~!G%U~#)5~#`3~!J~!Z~%]~%Y~%C~!q~!u~#kz~%#~!6'~!D~!U~!?~#T~!c%~!G#'~%7|~!G~!J~!G&~#pb~(Df}#%}*&}#%##%##%##&#-}&'#'&%#.++}%mI,#,@&(}*%}*'%&##&#%##%}&0}#.},U},%}+%}&%}#%##&}B%(}(%}+%)})%##%#&}&%##%&}<%}>%#%&}*%}(%}9%}/%})%}*%}*%}?&}&%}3%}&*#%})%#%#)}#&#-#+*%E%%'%'#%}#*V##&##I}#&&##%&%#&&Qf%%))w/0+&%#(#.%-''''++++7}>%4'',##1,#%#&%##&#'##&#*#9)%&%}#*}%,#+P(%A&%#'&##wSD',9E00#y#@}(+}&%&>~!#~!X}#*}(&&}(&}(,%}%&#+&}#&}I%#%}%)#(},'%#*}4%%#%}(''}#/##(##),%-##%%)#&}(.}&%#&}%%}*&#%},&&}&%}#%*'#%})%}D&}&%}-&}6&#&}-,%}#%})-(~+`~,=?~I9'9%~!,#%})%})%}@%}?%}(~!?~#<~#pP~#BG~#=1#%K+~#?#~%;)~#A~#mF1~#A'~'X%'~#lR~#N~'N~#r~#m#-~#i'?%#'%~#B%##%,%#~#_%#0%~#]732~,w~2+#:&#%&'0%&>%}#>##F+)#%&&#(+_}4&}-%}(&}@&}O7Fdf0@+/v4}&WU##&/0#&'('B#%}.%}'+#%}#%%&#&%#%##+#&#)#6#'#.},%}c%},%#%##%&#&%#&~#>'*-.%##%##%}#%%}%'~#)D1}#%*&~#_%%'(~#S2%'.}#~#=##*'*-%}&'%'##&&~'E%.#&~#M4}%%##&'%#~#O1##%&#'+~#<B%##%%'%+~#;#@%}#&%#&&%#(~#H1}'%'##&&~#?A}&'~#D#%32}'&&&&~#[}'(#%}'~#;C})&}%%#%~#=&%,3}%'(#%%~#^'#&&)#%'~#Y%-~#d-%'~#^%%&#&&&}#~#b~2t*&'~&(~&@~0%~e~3}%*''0})&}+~!9##-}#%-hD*)1fC#%/&/fB#40~!+#)*4~!+~!K'&:~!/*7~!.#~!H~!L':~%x&~!H#~!*~%1~!I#~!+A~#p'~!F~~#-#~,,(~.Z~!V~%;'B'mq-W~!N~%I%#&&#&}#%},%%}'%}+X#%}#&}(%}'%}<%}#%}%%'}'%}:~![)9@~%>~#UA%-%##&~!C%~!-.9:~!1~!-^2/:a~!y,D*J#-5)/4~%23,~#G~!L1~!0X3`~!2+~!!0-~&E~!W~!o,>Y&]~%cZx_&~#O*9#A#'#+I'%#)~!0B*-5A+-((F&*M#)(-7-5+'-3a5Vi~!Y~!?+[)%3),ERHm~!+:D,VG.+)?fB%%*(%)'(#&80%1'8`K8?`+'Z#&O&'H5#*9)A%%5&3))0%39+.*7#()&&*=4@**L)<'_&*+..;(#*+)./&0#3)%')-8(4ixD(&.}%,('aI:,)%,k2231T)I'#/-W7,/'Q#.'Y24+h')37</31&83##&0#),H(?'&?/1##%#&&#%''-%&&&#(&''&#.-'%#%%(,')*'&#&#'##%(%(#%('#&##%%%%('%#%#%%#%#&%##h>w+v<ayvyvcg.uuhKr}g/v|g>u9i[~>g5uI~=RvdwEg;v/g;uk!!TTSx]@RT!U!#!@VBRUU!'UTe-d0c`e&gSdicedFcrdTaqb.kYcAohdYd@a3e+d}dMdtd.aJ#bqcK`dle/e.e'dwdPdodddjbEb}ogd^ofdpduc6j?l%d{drdqc)d7bacOdQ%T#Y)X.sR[yH>6Vyv3[xwLu>vo'!*.[yBacahoj>6Rew3[xqdZa#!a&#^(X-[yG>6Vyu3[xvg3sEr|g.u/Ri9db0T#^(Xa)!-[y;>6Vylg4wKs{JwNZt3@3r=c4Z([xlg;wKt!cpq's@v7A'*a(a+!-a#[y<3Dt?3Dt'>6Vym3[xmg9rxsNJwLZt4~?r?db1T#`-!(Xa,!0[yS>6Vz%NuQs.g4wKtnJwNZtS@3r>c4Z([y%g;wKtrdga8!a(!#&T*Y-Xa#!a0<or[yc3Dtq>6Vz43[y3JwNZtf@3s!Ju}!%Dti:pm3c_%X#tjB5pkd6q!r]u?voC'*-a.a2!0a&a+[yI3DtI3Ds~3DtH>6Vyw3[xx;:s#~<5pKJwNZtE@3r~d`a)!a2T#a.(!+U.X1[yT3Dt`3Dtv>6Vz&3[y&g9rxwzcxstPu.<rAJwLZtT~?r@dZa%!a.&^*Za(/Reu[ya>6Vz23[y1g3sEr}wkg{NuQRg{ci(U#5@b`~,cg#U(2WnH5wugcRh7dX#T(Y,a'Ta!!a,[yZ<]mj>6Vz,3[y+Pv#5ReZKu+=,%!H}7ABwkaS?Rh:BcW(X#<]mrj:ubv/ARekdg%!(!a.*Ta(Y.X1!#sP>Rl*Dt6[y>>6Vyo3Wf*jOvuumvuRgRJuq*!:9<B@bX~3jVv&v@s@5Re[d/rQt{uAvo&a&a*)a2!,0Wf!3Dt0=Bs'>6Re}3[xy~<5s%JwJZt1~Gs)c;&!#2sJkNuXvzq7rxu,Re8dka4!a8(aEZ+a@Y.X1Xa)[yd=Bs(3DtP>6Vz53[y4cX#X&Re:avRe9~<5s&JwJZtQ~Gs*i^rzvdRg+Jv{%!2sbB@bX}kdga,!Za?&^*T1/!a'Dt+[y6>6Vyf3Wf%g/u;s4hGu6?Rh-JvZ,!c%#&RoX54Rivj7uyvf8RgTKvZB%*!2sGh<vu5Rgq<=C::9bb~#dZ#T&Ta6Y.X*Dt>[y93Wf)coZ(T,6VyifluvRgC@95@B@bX~/hFu34cC#T,k/unq8w8Q5RkUklwQuzunq8w8Q5Rk8d/rJu?v8w9)-&!a0a;a&aIWejg3sEr/h1s<DtDJvyZqY5aws3Jvy!&Wei~Hr1:au5@Bag>23E~5c:Z&bX};kKv?w&unuVu5Rjc;>bs)#~@:Rh.=ay<a]C;b`}Vd6s/t{uAvoaxa()!a,a7%-a#a2Dt,[yF2Wo[>6Vyt3[xuNuPRi&NuPwpi#RoWh?vf8Ri%Jv]!%Ri:KvxD!.'2WeAjZu`q9rxu,Re7woeAg-unLq(qA_/*2Wg_g3u5q^9:4E}/jTrxrzv=Wkkd~0UX#^^Xa-a1a5T&a=U1a'*aEa]!a*aPaA-adok[y54Rn>;:p3~Dp5g9rpsFNvZqjg3uJp4~<5p0Pw;5qlJwNZt*@3p1Pw:5p/Ou!5p2JvG'!6Vye=<qnJvh_[xhg3v,Rh3kOwOw-sDuev/Re^dha[a%!%!a+#Ta7)-5TaCaO!aka!a)sf[yb2>Rl!9ARiq5E}Qg=ucRkBE|oJrJ_@Wk~@Wk{JrJ_@Wk|@WkyJrJ_@Wk}@WkzJvO_[y2g-vMRmiKuYC!)&>Ri;>Ri<@3RkNc](X#@9Rk=g5vuRmhKvDB!+'=]meg3u4Rmgd)#Y'Vz3CARmfd`a+!%T'!+#Ta1Ta6TaM-sTDt9[yA9sYd'%Y#s[[xpj:ueunaXRgEjRq,v-vuqdd2'`#6Rev<32@5>:2<E}5xIo9a*X#Y(;5RePJvD_g>vyRgNj8w)v8<wggs:RgXiZt|vjx,hSq3ah!-(~@:Ro/Ou!5RhWj^v(pyw8unRhUdx-UY#^Ua.a3a70!)%UX1TaDa)'omRiRRhE[y:3Dsz=Br,>6Vyj3[xkg6ruwjcqsrPw;5r*Ku]D'Zt-@3r(~?r.i[vwv]dU1a--U#`a4(g/vsRhPOu!5RhLj:rmu9Wo!~@:wdh@g/vsRiTjXuvvNr}:RhBj^v(pyw8unRn]dz1UYa'a+^Y(!aETZalaRY.Ta?a4[yDJw1!#qLsW>6Vyrfzq-pLflpwRe|Js>%!Dt@3Dt&Jvy_[xs~HrnjMuwpsw'RecKu+D#'!t<~Grl~?rjg5u-x,gwp{ah!-(~@:Rg~Ou!5Rh'jXuvvNr}:Rh#cW#X/c;&!#2sLi[v7u7RgpJv)(!iLrxu,Re6j7v@s@5Se[e7d`aW!Za(a`T.a#!a3!&aDa-!9)Dt_=6s+3[x~~DR|h~DS6avhGun5RkZj3w)v-]mkKunB!&*]kb97R|i<ARk<c:Z(6Vy}Juh'!wziMRoS:F|vkLuauJv5vtvQRh1d='T+Y#VyO~DR|jcF#T'7R|g97R|kJv3'!ay<Rj,Jvh&!:ReXcsa6*a+#a#_aIRf9aLRf?c,Z&Rf5Rf7c.Z&Rf;Rf>cQ#%T'p-Rf8Rf=ct#%'(*!,p,Rf4p+Rf6Rf:Rf<d~'Ua%U*^UYa(!a,-!#a4YaTalaEX0a8a<Weo3Dt/3Dsx=Br93Wen~Dr;~<5p<JwNZt2@3p=Pw:5p;Ou!5r3c7&!#:p>3Ds}KvGB)_6Vyk2sM=<r7x'eovA(!hFu1ARf}cV#X&@r5j6rvwQa^Rf3c=Za'wkghJv__g;unRggA53B9=b^}%j6uduo5Jq;!(hIv%2Re`Ou4ARe_e%a#^^^Xa&!a*a2!&a6YaP!*ad!#a:aE/5Rn?[y@>6Vyp;:pE~DrY~<5pBJwNZt8@3pCh=rt3rWPw:5pAJup_[xoNuPpF9c!#'45pD5ARn)d8#X'X*3@rU72s]h>v<<sSjJpqvewOJq/(!hNw'5ReBk0s2u3w/w'5ReE5@Jq.!a+JQ!&WeU23d(#Y&RjG5]jBk!u7w&u0udARjEe#+^^^Ub#!a2/a`Z(agT1!a-a;|@TaG!aS[yV=Re~fow'RguNuPRe?bz#'>RoUWeL>:Cbb|?JwPZtVg6ruRmzJvD'!6Vz(g/vmRh~Jvy_[y(g9voRgyx*cy(#2>Ri2B9b]~9kIw9u7rluJu3Rg]dI#a%UY'@=p%CAx.gQZ&RhwwygtRm{x5g_Z'+ABqR9Woa=Bp&dV#^*Xa'!&@o{g4v]Rk;Jv{!%Rk[wkkiA5RkiwwfUB=x,fUuqC&*!>RfTg8v0RfV~ARfSd;rJsAuAv9wR'ae+/aO!a@aza/a#[yQ@Wg!2Wemg3sEr0JvB_g>uvReWg2v+Re=KupB_+[y!2AbY~-~Hr2AJwD!(h<~El>h<~El?Kun@+_:9b`}Kg-v/Ri3g;vtwyk_9]k_d=&T#*U.6qh@Ab`|K9:H|CJv[!&3Dtex'fDwC%!Rf[9WlMd[(^X,!a%Z06Vz!@WgBg=v~Rgvg,QRe@awd,#Y+jTv|Q~EfWj]uNr|~FRfXdy#Y&^Ua%!aO.!(a)Ua;=!a@aKap!a-,a!Ta]a[rSa]p?[y82sK=Bq~;:p:~<5p8Pw:5p7d'#Y'Wf(;RnRi[u4w&RgJJvG'!6Vyh=<r#ijuuv/sIKuYD'ZtG@3p9~Gr&d2#`(g<vtRgFj`u5w&rqpxRf2CJuY!+:wfnTOu!5Rg}jNs1ucv&RfwJvA!&3@q|BDcC#T,k/unq8w8Q5RkTklwQuzunq8w8Q5Rk9dga#!a'!a=#a0!:+Tb*b@aO.a4!aba8aFJv^}?!VyR~Dr<g;u%Rn.~<5p[x'e`wNZtR@3p]Pw:5pZhNvjBp.woe_g5u-r4JwF!%DtO3:ooc7&!#:p^3DtpLuGw(!+%)Dtk6Vz#2sd=<r8d'#Y([y#<x3gJt`w@!)%}MRiowzikRij=]ilxAf3,U(#B2Rf#g0v-Rm[ck{`U#]giKv3>)!&6Ri154s,KuGB_%@r68r:dJ|t`#X(9<E|u2@H|rx3gJu?w'!+'1Nu7Reg4=H~+9<wxgY95Rm]xLggZ-`(X}U2:Ri4h<uOawRmsJv__5@bb{jbV~3dka#a'a]!,#a+U=a>b6a3b%!/aKa/)!arwve^VyJ;:pR~DpTg3uJpS~<5pOPw;5qmPw:5pNOu!5pQJvG'!6Vyx=<qoJvA!{~Jup!%@qk7Rn/KvyD!}''[xz;>wkh'?Rh,x8gyt`w5D!&),(SgyccRgztJ@3pPB5p#d'(Y#<]mmifubw&RgoJvE&!82s^JvF&!8Rf,ADb]~;x=h'rNu]vK!,%'*0RnORh)4Rh*AqQg-vaRnNg;wHwkh'ba~4cE#Ta*x3gctyw@'!+%RnFRnD<4Rn@hFvK5RnCxWg[#`&a0Ua()`1Rm75Rg[c]%X#qi8Rg^NvdRj>BwzgZauwji7Rm6A4wgg]d1#&(*,.0a#Rm;Rm<Rm=Rm>Rm?Rm@RmARmBe%#^^^Xaea?aC/b+(,!a+a#!a/!>a&Ta<aKbD!2wphBRnk[yPw}hE|.=Br-3Dtm>6Vy~g6urRf.x,hPrNav!%'RnqRo%Ro#Nu;q[Pw;5r+JwNZtM@3r)d'#Y'Weh;xChL#`&RnmRnoKu}>%(!Rne~Bs-;2wjcussJv+'!aYSO}6@B<5?ba~8LrNvj!.%*ROwungw~ng~:9;Ri^>wtnig;wHRnixDh@|(UZ.x1h@|)!#:2<H|*xHn]#-UX'3Ro)z=iT}6ARns=Bwsn_wpnaRncw]aR(#UXa&Ua*a/=]iPd'#Y&Ro'WnXf{QRm2hNvj]nZd`'T~&1`{|`#9b]{}c:'!#Wl{>@=be}]?cl{{U#:5Abb}Jds#^YaF!a*b4a#a3aPa>&Tb!bH!*a_!Eau?/a&RjY<]gj>6Vz*;:pe~DrZg,QRj1JwNZtX@wihspcJvZ&!VyX9WmOJu|!|N2WmHJvh&!]ht~Bpbcn&T(!#RmQ<s7Nu;padH#X'`+WmJ@>RmKCARhnKup=!)&Wf+:RhqNuPpf9c!#'45pd5AwghpARn(Ls@w!%,)!RmP@Wfe<E|IJva!&WmNg8vsRmLd`*.`#Y'Xa!axRn*]hrA8Rhug5s@rXg8u!RmMd8#X'X*3@rV72smdI*#UY&RmICARho~GsgxVgd)Ta'U-Y&Xa!T#RnEWnA@Wffg1uDRi0hFvK5RnBxGnG&#`%owp)@wsf+bX}Ze-*1!a*^^^Ua|!#a.aq&Ya2!a>.a6!a:aO`aJDtL[y`@Wg#>6Vz12@wzoYRoZNuPRi!NuPRhzg=ucRi,@=b`{Yg=ucRi-ACJvB!&Sh[ebSh]ebi`wUuFRm4Jw2_[y0JvB!.<Ju(!&SoG}6Shd}6<Ju(!&SoH}6She}6Kur@._g5vHRieJvx!{L2G{Kx6gd'T#?Rh82Wi5cZ#X(g1w)Rm5dW-Y(Ta#!a)!#aYa=wnfE=su2>>bU{0j9udv:<svj8uQv-7RgHdE%#^'sq9sp=>Bb_{TJv`!&g/r|snj6v(us5d,#Y(56H}[978H}]Jw5!&g1rushJvB!+j;v{u5?zDhd}6}bj;v{u5?zDhe}6}ce*#`(^^^a[aea!=!a6a*aoXb1a.!aAbL!b>,b'aL!aV@Wf|2Wlg3[y/JwNZt^@3piPw:5pgJunZou3@rsJva&!Vy_g<v~Rm#JvG'!6Vz0=<r{Ju{%!:pj@WfsiXuJu3Rm:JvZ&!WfA~Bph@c4Z&Dtwax5rubx(#:awRk1@d,#Y&RfjRfid1#,Y(@Wfp2Wlrg5s@ryKu[@!,'=]ig9wlk?Rk>g5u-rqJvy'!@9RkQcH(T#=>Ri~@<wkj(Wj(KuZB*!&<7rw@9RkRcH(T#=>Ri}@<wkj)Wj)dg(Ta2Xa9X#`-!a*CARhg@@=I}d9x;c~#X%so=<sj>2@@=aybb}XjWv0Q~EfEj3vLv;<d,#Y(56H}`978H}_dgaPaFa'a/!#a3Y0a_a;a|!1(a7-[yE3[xt;:pJNvZrrg3uJrvJwNZt=@3pIh=rt3rxPw:5pGOu!5rpJvG'!6Vys=<rz@c4Z&Dt(ax5rtJvZ!&~BpH@wsfNg-vaRlNci*U#=<wei<F}a5@Jq.!a*JQ!%@qZ23d(#Y&RjH5]jCk!u7w&u0udARjFd/prq=tyvpaEa(a:.!a1aZ(@@=I}:9wpd%=<sX55w_h}@@=I{t=ay<aU@@=I}T=ay<2@@=I})?C9:9au@9Cb]}DP~=x-fAZ(2Wl1=ay<aU@@=I}>5@d##Y+jTv|vV~EfFj]uNpn~FRfGdgaK!Z2&!a8a-Tb({E!acTbM*!a(DtY[yYd'%Y#sl[y*hHvh>Re5x2c{Z}.j4uCvcawRiMd+#X+_x&d!},<5RkX;2Hzw@x,gavfB-!{CcF&T#Roe;RodwWbBg5urRgaKvHC*_6Vz+<4opieuew&Rmq@d]&Y)X,T#X0Rh}<BqP=4qS9:ReMg/ujReNJw0!/<Jui%!bd{kawwnemRelAxUa?a3#*.&UX(Ya+a/RhvRnQ<o}9Wmtd-#Y&RgSRmw9;Rmxay=Rmyg-vaRmuxEhSrNu,v-voC!%(aR.a(a7+1Ro1>Ro5CE{A9b]{@;5x#eO{:g;urRi+KrNA!%(Ro3>Ro79;Ri_Ku@>{;&!x%gX|{KunA_+g5QRj/g3u5Rj#g>uERj%wio/xRhS&!,!#^1U}wba{8>>@=be}qC@:D5ba{7Ku+A&!}x?ba}t>>@=be}se(aA^^^Uat!b0#{pa+awUazbGa#aLb9bgaWac'a5TbS=Br!d1#`%scp_Jvl!#rT>Re0JvX&!VyN=H{Fcm#U&:pY=ReaJv2&!]h0=]nUJvG'!6Vy|=<r%JrM_=]h2@Wlud'#)U'Wf'b]{i=]h/Jvh!&~BpWg=v]RnMx+ny#'Nu;pVwjnu=]nwxJnx,T#`&Reqwjnt=]nvieu9vrRjLLuYwP(#+!th@wih5pX~Gr'g5v/Rh4KunA'!-CARnP@wwiN:Rm_9x'cvw>!|l=<saKvAA!0&3@q}>w^e1bp#&Re2Re3BDx7gH#T|f5H|eKuZ>!%(:qNAH{]Jv6!+3B2B9=b^{X<5<B92:E{ZLvhwA(a;a%!igQuyRmad+#Y}m@3Rh5d8#X'X*:AqUAHzmaxwbh<aXRnVcF}RT#Nw&cj#U(BWnug/vsRntdka)(a3+.Zb7aYYan1!bVa@Xa}[y^@b[{G=H{+hFu73Rj&Pv#5ReQcK%T#sig1v{Rj'Ku+D#'!t]~Grm~?rkKuMB!01d5#`'Vy.ta3Dtu~Hroc8#'{^45s85AwZbP&!#Rn!wghxWn#KvEA!)&2RlA2RlBx:h|#(T,=]j09Wobz>x]z/@awRoTd+#Y(az]hFhCrm4d,#Y+jTv|Q~EfMj]uNr|~FRfOdCa!Xa9_X#@<plJvf!%b`{(9;Rgwc;.!#2x7cw#T|UDb]|T5Ju={(!=@E{&Jv)&!Ab`{'awJvf!~*>>@=be{#KuY>!+&4Ezyi[ugv&RjIdea+T)#UXa&T-T&a!Rh9auRmW=]kLg5vuRn+g3u4Rn-Ow6ARn,hHus5xNk?#UX(U~)/g8v0RkD~AwkkF?Ri.OuNBwkkA?Ri/d|a2`a*^UYa.!aBTZaTa'Xa;!(!2!-a#b2[yC>6Vyq3[xr2Wi?g1rusVh%s?DtF~<5rbJs;%!DtBfswKtCj[uvuSsEu3RgVx3o:u+wN'*Zt;@3rd~Grh~?rfg8w)Lq)qE&-a%!>bI|`jWv0vV~EfCjTv|vV~Ef@j]uNpn~FRfBcK#T']gWNu7x,k7q4ai(0!hHv8<RhmkMu9vrsBuev/RhlCJvB!,g<v{wchh~@:Rhji[vrv{wchi~@:RhkdS&a5UY#Ta!RgPwwiI5BwciI~@:Rh`x'iJvj'!5]iJPu8Bwch]~@:Rhach)U#h3rp]gLh@t|Ax,hTq3ah!-(~@:Ro0Ou!5RhXj^v(pyw8unRhVd|)`,^UYas!a?/a2Z'a^Ta{Tb7Ta(a#!a,Wf&9sZ3DtAadamov=Bqt3[xig8vsRm~>waiL2b`{QJv*_Ouv2qgj<v]v2BqfdR'X*X#Y-@3qr~Gqv~?p6hHv-]glPup5Lq+q?_%*b_{qF{n9b^{rOu4ARhpKvCD!+&~Bqp:5Dbb}nwoiKl&unuTuBv]v+ueunaXRf0=Jvh!0nKufu8v1w&w7q%w&uHrz:Rgnj5w,uxDJq/(!hNw'5ReCk0s2u3w/w'5ReFd>Za&!*UaA=<wkgsRnSJv^!%Refifw3vyRgOKu_B'!,<]gkiiu:w&Rh<=C@a^<B57@2F{[<B5@aW:=3away9A5aW=<B=C@a^<B57@2F{Ie-#`(^^^bCara.b8aza6!/bZ,!adTbnTbOb+aFaS!aAT9@Wf~2Wli3Dtl2@d,#Y&RfnRfmJwJZtN~GqyJva&!VyMg<v~Rm%iXuJu3Rm9Jv[_=]ih9wlkDRkCd1#`(@Wg>2Wls3cH#T(@<Rj*=>Ri|b~'#23s9h<~El.d'#Y&Dtxi^rzvdRl#d*#U%(o|B2s`hJwSaxRmDKv4B&!1:Rmdd5#`'Vx}to~Hq{x'f1v3(!BA5ba|bJv_&!Wfug1v]ReIdO+U/Y#&G}-8wze=Rh{g1v]ReHg/uQRf/by#)ibQwERl/cH#T(@<Rj+=>Ri{cNu+vlax-!(#a0qa9<Rii2;;bU{H;x<i=&X#Rk`<4wwi=C9H~8xAI(Y#<azRi@45wXI<B9;5bb~7dL(X#Xa(+!aL6Vy{g5QqOau:5au2@ay547EzbxOcU(UX-T#Ta#:Cbb|A?wjh/b_|SOw6ARgtihr}u7Rhy<d1#T)X1@@=I|~=ay<2@@=aybb}Sj3vLv;<d,#Y(56H}A978H}@dGpvs@uAu`vcw9*!aFa+ai%(b!aXa8.a?a[ozWey=sU2@G}Nch&U#Rf_WexKu+D#'!t:~Gr`~?r^j]uNr|~FRg*j^psurwJt|RmcKv)@&!)7Rkv~Br[@wxfO:Rl3co#U'6Rezj_q#vIuavjRltwzeyh@vr5JqD0!>aY?C9:9au@9Cb]}9cl#U*5;5<H||jbuus1ucv&Rfvg1v~d/pppzqFr^a--a~!aMat1(hFv;Wiz@@=Izoj5uuv-7Rix~Cw`fk2WlVcZ#X,k)u3vWs@u2]ktg;wEx'fBq(_2Wg/jTv|vV~EfoJv]!15x'hzqG!(P~EfU~CRl_j6v(us5x4i-#T(2WmZ?C2F|d>Kq<aj1!*jTqIsBv=Wl`~Cw`fi2WlWj`v0u*~>RlR=c>Z,k#u3vWs@u2]kr<c1Z+jTqIsBv=Wla~Cw`fm2WlXdmb3!a{(arZa`bkTa%TbQTa-a9+c'!aM!/[yL=Bqug.w'RifhFvyDRj.g>vgwyk^9]k^Jv3_@WfbAARkhJw2_[x|JvB_wkoIRoKwkoJRoLd'(Y#<]gm=<9<H|yd'%_X#skDtb3awwqkgNulRkgdB#^',9:p'hJwSaxRmEBwVb8@4=H|qLu+w50&!)@3qs~?pU>Awwn;;Rn=c:Z'ARn<=<qwKvC@!/&~BqqJv6!&]eVb^z^xRge'/a%+^`#Sge}6<4Rn3=]n0Pw2>Rn8Jw0!&>Rn:>Rn6cY#a7+!a&=<wkaNw~h3z_c5Z{=wjh#=]nLKv^D!&)Vyz=bW|swYb<WetcG#T(2wxa@qVx@gD#Y&b^|V5JwG&!5bb|pg/w&RgD@x=kHs=uAvn!a%%/'+RmSRh694Ro`g-vaRmRhHv-]mlxCcS#`&ba~.5cD#Ta)P~=d,#Y(56H{>978H{Dd_#{2^Y%_+qbbb{6g3sERhsbU{?dfa.,`a(Xa<!aiX#(55RiG54RiHcI#T'WiU3RiVNvdwtfcRlKNvdd,#Y&RlHRlExQgf.1*^T'X#Sgf}6Wn4=]hfPrk>Rn7Jw0!&>Rn5>Rn9Lunw?&a2!,5<oq@@wqfdRlJj5Q~=d,#Y(~ARfcOuN]fdDKw;ay(}i!547E}j?cI#T(@5bV}iCbV}hdv(^^Tb?a40,b##Tbo!a*bR!a<b|a/!aKai!aU[yK=]o^g:v>ReGJwPZtK<7Rh+h<~El,Pv#5ReR@awwxjCg,ulRjDJv6&!]j!z?aQeeg>w=Sh<eeJw;!&axEzOg,Qosc!#*:wkeJ]eJ>x'h-u(!%Ro.w~h.zPdNZ(X,Ya![x{;9ReY;wkgxRiF:x?ap#Y&RmUg<s2Rkod]+UY0TZ'!a&A9sw<=bczLNvuw{gqzNhJwSaxRmCKuLay!#&s_Rf-55b^{uJvZa!!c%#(55Ri654wmiu5RiuawLu,vp!+}^%b_}Y9;wkgxba}o>A9:=b^}zKuh=a''!3awRk3c*'!#aHRk6c+Z&Rk5Rk4Jv)&!awRjSawd9*`#0?C2@EzMj8u<uJ5RmbjQrquJu3x,k>uq@_+=ayb^|W~ARkEOuN]k@7dhzV^X/X&a-#zRzSb`zXcJzTT#2WkVKvDBzW!%FzY9;5bbzWjQrquJu3Jw3%!b`zU=ayb^zQd:#X(T-a!6Vyywxh}=b]{Jg=u1RiAdGp~qHtzv!w(wA+a+a;<!aJaYai'anasb(=azRmV:Cbb{MLq2vb!%')RjuRjrRjtRjqx3jnqCw3!%')Rk(Rk+Rk&Rk)Lq2vb!%')Rj{RjxRjzRjwLq2vb!%')RjsRjpRjfRjex3jcqCw3!%')Rk'Rk*RjkRjl9<CbbzfOu4ARhxLq2vb!%')RjyRjvRjhRjgx=joq*uKvb!%')+-Rk.Rk%Rj~Rk-Rk#Rj}x=jdq*uKvb!%')+-Rk,Rk!Rj|RjmRjjRjidAq&qKs@uAv8Aa.'*-a@a&0!aM@a5[y73Dsy3Ds|3Dt):wxgI2sHJwJZt.~Gqxwsf0ikrzt}Rl0Jvy_[xj~HqzKv_A|D!&WfP8axRoVcf,U#k(v]v+ueunaXRf1Ju}'!g8u#Ri=jQw!sCunLprq>!,')~<5qeGzq9F{W=c##%s5au:5aU3CBE|;d4#X(D!a&6Vygx(b;#(=]ed?C2F{N<capoq2r[a&!aPa9,'Pw;5s:@@=I|,55w_h|@@=IzcP~=x'fCqB_2Wl2>aU@@=I|1OuNBc1Z+jTqIsBv=Wlc~Cw`fl2WlZ~AcTa%!Z+jTqIsBv=Wlb~Cw`fh2WlYk+uNqJsBv=WlSg,u3dca3#UXaMYa)TaB-=cM|7T#<bI}l5@B932:aV2G{BOuNBJq:|M!5Ezt=<B=C@a^<B57@2F{v>cB{/T#=ay<bI{3Jv6!a.6BKq0ah&+!5E}HP~Ef{978BaU@@=Iza<7d#.Y#978BaU@@=IzH~AJq0!(@@=IzG978BaU@@=IzFe,aU*Y&^^^bvJb,b:bFad!a,c2Ta>aL.bo6!a#CbTa'T#Re{2Wlh2@G{yg6t~Ro_NvdRfticuRQRllJv3&!x&c|zs@Jw3!%RflwpfkRlpKuL;%(!Re<@G|C2GzdhIvuBwgjAg-u0RjAKQB%!(GzZ@G|5NuuRl7d='T+Y#Vy[g<v~Rm!==G|>JvA!)@wma=]m1ifuaw&RmnLs@vT'!|/+[y,g:v>ReTJw1!#qX=x!eC{bLu+wT&)ZtZauq_~Graci&U#F|89:r_Lupvq!.)&2RlG8RfaC=x!eF{_h?rpWlmd&'!#X|&]k::xJey#`'T|+<E|&2@H|%dE#(^,g;u.RiEg6vjRiC9xCkA{O|zY#g=ucRmXKs0@!&*@G|m@awRknJuh!,3d(}gY}eJvj!%Rm):Jw3!%Rm+Rm-Ls0w(&!a(a#@b[|6cZ#X'7RkxWgAOu4ARn'dH'U#Y*Vz-Wm'CARm}d]*#a%^a*T'aK!a<9bV{PC=p*Jw4!&SgxcbB5r]idw(wBRmF7xFkt#&`(Rm/Rm8E|!JuY_9:Rl5=wrgr2:bbxd@xXfB(a*#T+!.X0X1Ta/a'T&RlDRfL>RlyARl9b[z[>RfZ:RlL:RfRwlg/ARl;9;RlxKv,A/!%7s69<74=BA5ba{-8Bde#`a<XaKYa1,a'P~=wxfB2bZ}}?C972@@=I}r8@55B9;5bb}G978B2@@=aybb}3j3vLv;<Jw3&!>Rfk=ayb^}4~Ad1#`*@@=aybb{w2@>==<bbz]dx+UY#^UaF!a9!bB'Ya1.!ajXa#%olRhD[y=3Dt#Ov5BrHKuMB%!(Rf^Wep~HrJwkiQjKr|~FRg)Ku+D#'!t5~GrF~?rDdV)UY,Z/_7RkuG{<~BrBg,rlsO:235B@bX}|d?a1!#`(6Vyn5@d##Y+jTv|vV~EfIj]uNpn~FRfH7Lq2vb1!a9-978BaU@@=Iz9978BbU}#~AJq0!(@@=Iz8978BaU@@=Iz7~AJQ|}!978BbU}!JvkaK!AdUa21-U#`a+(g/vsRn~Ou!5RPj:rmu9WhOjXuvvNr}:RhAj^v(pyw8unRn[kPr}p|u7vwv]RiSBd;pppzq@qHQa?(b.!a.a`@.|xa(hFv;Wiyj5uuv-7Riw~Cw`fg2WlU978BbU|wOuNBJqG!(P~EfD~CRlQcZ#X,k)u3vWs@u2]ksg;wEx'f@q1_2Wg.j]uNpn~FRfqJv]!15x'h{qG!(@@=IzK~CRl^j6v(us5x4i,#T(2WmY?C2F{1>Kq<aj1!*jTqIsBv=Wld~Cw`fj2Wl[j`v0u*~>RlT=c>Z,k#u3vWs@u2]kq<c1Z+jTqIsBv=Wle~Cw`fn2Wl]dn1#c(a(b^a2!b/bAT(bj!aDa7bu,a_a{c0!2T0g:v>ReD2@G{42@G{5~DpM~<5rc=Bx6i>{RT#RnI@zCx]y]z:2Jv[!zr5Awyk]9]k]dD(Y+X#6Vz.g=wKtgwhaCwgmTWj2Lu,w%_+/[y-B;b^xeg3u3Rj-2@bX{*KrJ<!+'@Wg(g?QRlC@Jv`!%b[zIwsfII}8JQ_@w|kW|=Jv(%!AqcOuNBJvEzh!bYzjLs@wP#(0!oy@>RkdJwMZtc3Dtd@BcG#T'9bWxg2@2Fznd*#Y+;2x'c}w<zizixNgwa#Z'U+!/!a'!a+w~g~z6wcn{Rn}wcnzRn|5Rh%=]nJg5vuRmvNvdRlvcprJu}w*az*a#!%.a.'Bot9qT]kj@Wg'ay2Gzv@Jv`!%b[zEwsfHI}1;ck#Ux`<Cbbx_Lu+w!a&0*!wko*wwo,So,}6Juqxf!E}PigQuyRm`d3(`#8>Rn%:A5B;bZ~%KvhCa!a2!x>k7#Uxb@b{#xaRk7Jw0!)>wwhlShl}6>wwhmShm}6CJvB!.x'hhvj{!!5Bwkhhbaz}x'hivjz~!5Bwkhibaz|xEhTrNu,v-vpD!a%&/)a3a.,%Ro2t[CE{)@3re9b]{%wjo09:rgc:Z&Ro6=<riifuaw&RmoKrNA!%(Ro4>Ro89;Ri`dSaL'UYzxZb)7Rka3xRhT&!,!#^1U}vbaz{>>@=be}yC@:D5bazzKu+A&!}{?ba}y>>@=be}wxBh[t`u~vJvr!%a!a()a,a0a4RoC=]o;Ju(!%RoGRhdwjh`=]oAg>w#Ro?g5vuRo=NvdRl|Ku]C.!&;RoEJvB!%RoORoMBx'h[v+_?w~h`}~5?w~hd~!xKh]oiptu-utv.vp!#%&a30a@a'a+(a/aOp(o~p!RoDJu(!%RoHRhewjha=]oBNvdRl}g>w#Ro@g5vuRo>c[#X']o<CauRoRAd-#Y':RkpauRoQKu]C.!&;RoFJvB!%RoNRoPBx'h]v+_?w~ha}t5?w~he}ue!/UbhYacXaW^Tc&a;b:a-c/#b&aja1(!cL+!bKbt!bmcRc9aIc?8[yW3Dtt94Rg`Jv}!&SiRMzBhEebShEMNuPRe>x7gL#TzuwjirRipc<Z&>on;>z=h-MSh.Mwqczx'a7vj&!>Re4@=ResJt__NuPRi*NuPRi)j]uNr|~FRfzKrJ>_+@Wfy@Wf]2WocKrJ<!+'@Wg%g/QRl@@Jv`!&awRl<wsfFIzgLu(w*!.*&ShBMwvhIRhI9;RhNx1hK'!#Sn]Mx1hK~0!#:2<H~7cNu+w7D*'1ZtW>Rn1~?rOc:Z&Rn2=<rQ<7wjh&=BSnLMc]#X(6Vz)w[b=a!U#9wzgMc3#&(RgMRitRis<x,gKt`ax!&+SioM=BSilMc3#&(RgKRinRimKurB,!&SiQMzBhDebShDM6BJQ!(P~Efx978B2@@=I}WLrJw!!,a*&@G}O@9wkibRid@@x'fKwC!&SlDMSfLMjUv~Q~EfKKv3@a+!(hFv-]mpx/hYZ(C5RiWz<o/MwkhY?So/M@x,gbvfB*&!SgEM:SoeeehFu3:Rgbda(,^TZa)X/7Sg[eb:2RgI~BrMC@wgkc:wwkcRerx3h(uUvK!&*,SnOM4Sh*MArRg;wHRh(x=h;rJvPwI!a4',a'0@Wg&=BSh/Mg>w=Rh=g3w*wwgGRgGcW(X#;Sg}M2Gzk@Jv`!&awRl=wsfGIz`dKZ*T'Y-:RhR7RhQg5u-p`j6v(us5d,#Y+~Awkia?RicOuNBwkibba}Ld6p~tyu_vbAa'a+!a/'a3aEa8a!>Sh,ebJv{!&Sh@ebSaReb9;SgwebNuPRi(NvdRl)NuPRi'hHu^<Rm^Jvv_@Wl(g;u1Si/ebKu'B&!*Sh?eb@Wl'z@aPeb95Si.ebcpputyvjB)!,&a+0a%ShAMWeK@G}C@WfJ9;RhMwvhH9w{ia}ix,hJvRA1(!zAn[MRhHx1hJ~*!#hFv(BSn[MBJQ!(@@=I~'978B2@@=I}2db.Ua<'X}+T#a0XaG2G}E;wkg|wuh!Rh!x,hZu,@)!&So0MVy)C5RiXACJvB!&5RiY5RiZg8w)cG}*T#2@bU}=KsA>(!a.3wkhZba~(x,h^u(A!&(SoCMRhb5Bz=h[eb?w~hb~6x,h_u(A!&(SoDMRhc5Bz=h]eb?w~hc~6e)aA1T#T,^^^c-bMb&blcPaP(a/!0!bA=b5c@a(!bfbrc#2afwmhARnjwchORnp2Wlf3DtsNvdRl-2@wpa<]m0bx(#:awRk2@Jw3!%RfhwpfgRlnKQB%!(G{V@G|'NuuRl6d='T+Y#VyUg<v~Rl~==G|<Jv+'!aYShC}6@B<5?ba~8@Jw3'!g2QRljhLrpWlOd+#Y'g.w'rIg>w*wgj@g-u0Rj@Lu+wT&)ZtUauq]~GrGci&U#F|39:rELrNvj!.%*RhCwunfw~nf~:9;Ri]>wtnhg;wHRnhx3hDs@v~!/+'@Wfr@9RkSNu&Rlo=@<5GzoKs0@_+@Wl+@awRkmJuh!-3d(}pY#qWJvj!%Rm(:Jw3!%Rm,Rm*de&!1U-U#`)Re;@G|.@9Ri82@wjfvRlq=@<5GzpLvOvr!).&2RlF8Rf`C=x!eE{.Jw3_g2QRlkhLrpWlPde(!#U{s,UXa*Ta'[y'g:v>ReS;x0PZ&RnlRnn~HrKJw1}f!=x!eB|2w]aP(#Xa&a*Ta.Ua2a7=]iOd'#Y&Ro&WnWg;u.RiDg6vjRiBNvdRlzhNvj]nYJuW_2Wm3x)kFze{9d])!a.!,Y01!#&aC!a3RndC=ox~BrC@2b^{pg,rlse7x'ksuq!%Rm.E{xidw(wBRmGx9o+)X#wwo-So-}69:Rl4@xSf@a#XZ'X)X,Ta(/ARl8b[xc>RfY:RlI:RfQwlg.ARl:9;Rlwdn'#^XafaQa1X1TaHTa)@b[{zcZ#X'7RkwWg@Ou4ARn&x)kG#{,g7u/RkGdH'U#Y*Vz'Wm&CARm|bx#(A]gUbUzJj9Q~=d,#Y(56H}l978H{U7d,0#U*2>ABb_xZ978BbU{e~AJQ{g!978BbU{hxMh?ad{oUYZ.x1h?{l!#:2<H{mx3n[t{vl!,&a%3Ro(z=iS}6ARnr=Bwsn^wvn`Rnbd`*T}B0!#^X'BG{c9b]{a>>@=be}F?JvS!&BG{d7BG}(Bde#`a1X,Ya@!a'P~=wxf@2bZ}I56B2@@=aybb}08@55B9;5bb}<j3vLv;<Jw3&!>Rfg=ayb^}&OuNBKuLA!)a!P~=x#fD{f2@>==<bbzl?C972@@=Ix^d6rSu,v7w*C(0a)a6#B+a%!sQ[y?3Dt%3[xn~<5rLOu!5p@Ku+D#'!t7~GrP~?rNKvlaya7'!h+v-5qMg=t|cd,U#5AAaa5Abb{S@52B5@a[@52B5Gx[iXueu;d<#`a(!/549C;ag>23ExY5@Dah89b^~689Jv)!~2b[~1Lv'w(%*!a#bX|aPrmawRe]keu7uhv-q6rxu,q`xTo]/a5aU!bNaDXbi!b-!ao!b<bwA!#5@B932:aV2G|:d-)Y#hJrL>RhG<7@C5<H|_=Cau:5aj5@B932:bJ|ng>vIbs)#?C2F|9jPv0w.vISh-MKvUaz(.!9ABbb|[5;5<H|Eg>unwfh;9:4E|YjQsBt|vjx'hYq3!(?C2F|J:2<BaY?C2F|GOu!5x,g|p{ah!-(?C2F|c9:4E|OjXuvvNr}:Rh&i[w*t|cd+U#jJvsu)vsSn~Mkfrmu9p}u7vwv]So!McW#Xa!ax5@A5aY:5;5<H|>kJv~vYrquJu3x4ib#T)2@SmZM?C2F|Bj:rmu9@xPhI(a*a#U#`a3-5Abb|L~@:RhK9:4E|0@52B5G|#C::aY?C2F|-:2<BaY?C2F|.5Jvk!a)javYrquJu3x4ia#T)2@SmYM?C2F|HAxPhH(!a#U#`a*-5Abb|4~@:RhJ9:4E|R@52B5G|F:2<BaY?C2F|Sc^#Xa2j=Qq5CJvB!-g<v{z;hhM?C2F|Zi[vrv{z;hiM?C2F|XKsA>!a)-g<v{z;h[eb?C2F|]i[vrv{z;h]eb?C2F|^iZu.vix,hZq3ah!.(?C2F|QOu!5ShXM:2<BaY?C2F|P", 13494, 2713, 49, 25, 61);
// ../../node_modules/.pnpm/entities@8.1.0/node_modules/entities/dist/generated/decode-data-xml.js
/** Packed XML decode trie data. */
const xmlDecodeTree = /* #__PURE__ */ new Uint16Array([
	512,
	26465,
	29036,
	7,
	0,
	2,
	4,
	116,
	24638,
	116,
	24636,
	8693,
	29807,
	24610,
	621,
	1,
	0,
	0,
	3,
	112,
	24614,
	111,
	115,
	24615
]);
// ../../node_modules/.pnpm/entities@8.1.0/node_modules/entities/dist/internal/bin-trie-flags.js
/**
* Bit flags & masks for the binary trie encoding used for entity decoding.
*
* The trie is a flat `Uint16Array`. Every node starts with one header word:
*
*   15..14 VALUE_LENGTH   Number of words the value occupies, +1.
*                         0 = no value; 1 = value inline in bits 12..0;
*                         2/3 = value in the 1/2 words after the header.
*   13     FLAG13         If VALUE_LENGTH > 0: semicolon required ("strict"
*                         entity; `;` is never stored as a branch).
*                         If VALUE_LENGTH == 0: this node is a compact run.
*   12..7  BRANCH_LENGTH  Number of branches (or run length for runs).
*   6..0   JUMP_TABLE     Jump-table offset / single-branch char / first
*                         run char (see below).
*
* Branch data follows the header and any value words. Its shape is selected
* by (JUMP_TABLE, BRANCH_LENGTH) in the header:
*
*   Single branch  JUMP_TABLE = the only child's char, BRANCH_LENGTH = 0.
*                  No branch words; the child node follows immediately.
*   Jump table     JUMP_TABLE = first covered char (> 0), BRANCH_LENGTH =
*                  table length. One word per covered char: 0 = no branch,
*                  otherwise the child's offset from the END of the table,
*                  +1 (so 0 stays the no-branch sentinel).
*   Dictionary     JUMP_TABLE = 0, BRANCH_LENGTH = number of branches.
*                  ceil(n/2) words of sorted keys packed two per word
*                  (low byte first), then n pointer words storing the
*                  child's offset from the END of the branch data.
*   Compact run    VALUE_LENGTH = 0, FLAG13 set. BRANCH_LENGTH = run
*                  length (3..63), JUMP_TABLE = first char; remaining run
*                  chars packed two per word after the header. The target
*                  node follows the packed words immediately.
*
* Pointers are end-relative (rather than relative to the pointer's own
* position) because that makes the common "child encoded right after the
* branch data" case a small constant, which compresses far better. Offsets
* to already-encoded (shared) nodes wrap via uint16 modulo arithmetic; the
* decoder masks navigation results with `& 0xff_ff` to match.
*/
var BinTrieFlags;
(function(BinTrieFlags) {
	BinTrieFlags[BinTrieFlags["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
	BinTrieFlags[BinTrieFlags["FLAG13"] = 8192] = "FLAG13";
	BinTrieFlags[BinTrieFlags["BRANCH_LENGTH"] = 8064] = "BRANCH_LENGTH";
	BinTrieFlags[BinTrieFlags["JUMP_TABLE"] = 127] = "JUMP_TABLE";
	/** Bits 12..0: the inline value of a VALUE_LENGTH = 1 header word. */
	BinTrieFlags[BinTrieFlags["VALUE_MASK"] = 8191] = "VALUE_MASK";
})(BinTrieFlags || (BinTrieFlags = {}));
// ../../node_modules/.pnpm/entities@8.1.0/node_modules/entities/dist/decode.js
var CharCodes;
(function(CharCodes) {
	CharCodes[CharCodes["AMP"] = 38] = "AMP";
	CharCodes[CharCodes["NUM"] = 35] = "NUM";
	CharCodes[CharCodes["SEMI"] = 59] = "SEMI";
	CharCodes[CharCodes["EQUALS"] = 61] = "EQUALS";
	CharCodes[CharCodes["ZERO"] = 48] = "ZERO";
	CharCodes[CharCodes["NINE"] = 57] = "NINE";
	CharCodes[CharCodes["LOWER_A"] = 97] = "LOWER_A";
	CharCodes[CharCodes["LOWER_X"] = 120] = "LOWER_X";
})(CharCodes || (CharCodes = {}));
/** Bit that needs to be set to convert an upper case ASCII character to lower case */
const TO_LOWER_BIT = 32;
/**
* Unsigned subtraction trick: (code - lo) >>> 0 wraps negatives to large
* values, so a single `<=` covers the entire [lo..hi] range check.
* @param code Code point to check.
*/
function isNumber(code) {
	return code - CharCodes.ZERO >>> 0 <= 9;
}
function isHexadecimalCharacter(code) {
	return (code | TO_LOWER_BIT) - CharCodes.LOWER_A >>> 0 <= 5;
}
function isAlpha(code) {
	return (code | TO_LOWER_BIT) - CharCodes.LOWER_A >>> 0 <= 25;
}
/**
* Checks if the given character is a valid end character for an entity in an attribute.
*
* Attribute values that aren't terminated properly aren't parsed, and shouldn't lead to a parser error.
* See the example in https://html.spec.whatwg.org/multipage/parsing.html#named-character-reference-state
* @param code Code point to check.
*/
function isEntityInAttributeInvalidEnd(code) {
	return code === CharCodes.EQUALS || isAlpha(code) || isNumber(code);
}
var EntityDecoderState;
(function(EntityDecoderState) {
	EntityDecoderState[EntityDecoderState["EntityStart"] = 0] = "EntityStart";
	EntityDecoderState[EntityDecoderState["NumericStart"] = 1] = "NumericStart";
	EntityDecoderState[EntityDecoderState["NumericDecimal"] = 2] = "NumericDecimal";
	EntityDecoderState[EntityDecoderState["NumericHex"] = 3] = "NumericHex";
	EntityDecoderState[EntityDecoderState["NamedEntity"] = 4] = "NamedEntity";
})(EntityDecoderState || (EntityDecoderState = {}));
/**
* Decoding mode for named entities.
*/
var DecodingMode;
(function(DecodingMode) {
	/** Entities in text nodes that can end with any character. */
	DecodingMode[DecodingMode["Legacy"] = 0] = "Legacy";
	/** Only allow entities terminated with a semicolon. */
	DecodingMode[DecodingMode["Strict"] = 1] = "Strict";
	/** Entities in attributes have limitations on ending characters. */
	DecodingMode[DecodingMode["Attribute"] = 2] = "Attribute";
})(DecodingMode || (DecodingMode = {}));
/**
* Token decoder with support of writing partial entities.
*/
var EntityDecoder = class {
	decodeTree;
	emitCodePoint;
	errors;
	/** The current state of the decoder. */
	state = EntityDecoderState.EntityStart;
	/** Characters that were consumed while parsing an entity. */
	consumed = 1;
	/**
	* The result of the entity.
	*
	* For named entities: the trie index of the best legacy match so far
	* (0 = none). For numeric entities: the accumulated code point.
	*/
	result = 0;
	/** The current index in the decode tree. */
	treeIndex = 0;
	/**
	* Characters consumed since the last recorded legacy match, plus one.
	* Invariant at the top of the `stateNamedEntity` loop: `excess` equals
	* the number of unrecorded consumed characters + 1.
	*/
	excess = 1;
	/** The mode in which the decoder is operating. */
	decodeMode = DecodingMode.Strict;
	/** The number of characters that have been consumed in the current run. */
	runConsumed = 0;
	constructor(decodeTree, emitCodePoint, errors) {
		this.decodeTree = decodeTree;
		this.emitCodePoint = emitCodePoint;
		this.errors = errors;
	}
	/**
	* Resets the instance to make it reusable.
	* @param decodeMode Entity decoding mode to use.
	*/
	startEntity(decodeMode) {
		this.decodeMode = decodeMode;
		this.state = EntityDecoderState.EntityStart;
		this.result = 0;
		this.treeIndex = 0;
		this.excess = 1;
		this.consumed = 1;
		this.runConsumed = 0;
	}
	/**
	* Write an entity to the decoder. This can be called multiple times with partial entities.
	* If the entity is incomplete, the decoder will return -1.
	*
	* Mirrors the non-streaming `decodeWithTrie`, but with the ability to stop decoding if the
	* entity is incomplete, and resume when the next string is written.
	* @param input The string containing the entity (or a continuation of the entity).
	* @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
	* @returns The number of characters that were consumed, or -1 if the entity is incomplete.
	*/
	write(input, offset) {
		switch (this.state) {
			case EntityDecoderState.EntityStart:
				if (input.charCodeAt(offset) === CharCodes.NUM) {
					this.state = EntityDecoderState.NumericStart;
					this.consumed += 1;
					return this.stateNumericStart(input, offset + 1);
				}
				this.state = EntityDecoderState.NamedEntity;
				return this.stateNamedEntity(input, offset);
			case EntityDecoderState.NumericStart: return this.stateNumericStart(input, offset);
			case EntityDecoderState.NumericDecimal: return this.stateNumericDecimal(input, offset);
			case EntityDecoderState.NumericHex: return this.stateNumericHex(input, offset);
			default: return this.stateNamedEntity(input, offset);
		}
	}
	/**
	* Switches between the numeric decimal and hexadecimal states.
	*
	* Equivalent to the `Numeric character reference state` in the HTML spec.
	* @param input The string containing the entity (or a continuation of the entity).
	* @param offset The current offset.
	* @returns The number of characters that were consumed, or -1 if the entity is incomplete.
	*/
	stateNumericStart(input, offset) {
		if (offset >= input.length) return -1;
		if ((input.charCodeAt(offset) | TO_LOWER_BIT) === CharCodes.LOWER_X) {
			this.state = EntityDecoderState.NumericHex;
			this.consumed += 1;
			return this.stateNumericHex(input, offset + 1);
		}
		this.state = EntityDecoderState.NumericDecimal;
		return this.stateNumericDecimal(input, offset);
	}
	/**
	* Parses a hexadecimal numeric entity.
	*
	* Equivalent to the `Hexademical character reference state` in the HTML
	* spec. Digit parsing matches the hex loop in `parseNumericEntity`.
	* The accumulated value is preserved for numeric validation callbacks.
	* @param input The string containing the entity (or a continuation of the entity).
	* @param offset The current offset.
	* @returns The number of characters that were consumed, or -1 if the entity is incomplete.
	*/
	stateNumericHex(input, offset) {
		const inputLength = input.length;
		let { result } = this;
		let { consumed } = this;
		while (offset < inputLength) {
			const char = input.charCodeAt(offset);
			if (isNumber(char) || isHexadecimalCharacter(char)) {
				const digit = char <= CharCodes.NINE ? char - CharCodes.ZERO : (char | TO_LOWER_BIT) - CharCodes.LOWER_A + 10;
				result = result * 16 + digit;
				consumed += 1;
				offset += 1;
			} else {
				this.result = result;
				this.consumed = consumed;
				return this.emitNumericEntity(char, 3);
			}
		}
		this.result = result;
		this.consumed = consumed;
		return -1;
	}
	/**
	* Parses a decimal numeric entity.
	*
	* Equivalent to the `Decimal character reference state` in the HTML
	* spec. Digit parsing matches the decimal loop in `parseNumericEntity`.
	* The accumulated value is preserved for numeric validation callbacks.
	* @param input The string containing the entity (or a continuation of the entity).
	* @param offset The current offset.
	* @returns The number of characters that were consumed, or -1 if the entity is incomplete.
	*/
	stateNumericDecimal(input, offset) {
		const inputLength = input.length;
		let { result } = this;
		let { consumed } = this;
		while (offset < inputLength) {
			const digit = input.charCodeAt(offset) - CharCodes.ZERO;
			if (digit >>> 0 > 9) {
				this.result = result;
				this.consumed = consumed;
				return this.emitNumericEntity(digit + CharCodes.ZERO, 2);
			}
			result = result * 10 + digit;
			consumed += 1;
			offset += 1;
		}
		this.result = result;
		this.consumed = consumed;
		return -1;
	}
	/**
	* Validate and emit a numeric entity.
	*
	* Implements the logic from the `Hexademical character reference start
	* state` and `Numeric character reference end state` in the HTML spec.
	* @param lastCp The last code point of the entity. Used to see if the
	*               entity was terminated with a semicolon.
	* @param expectedLength The minimum number of characters that should be
	*                       consumed. Used to validate that at least one digit
	*                       was consumed.
	* @returns The number of characters that were consumed.
	*/
	emitNumericEntity(lastCp, expectedLength) {
		if (this.consumed <= expectedLength) {
			this.errors?.absenceOfDigitsInNumericCharacterReference(this.consumed);
			return 0;
		}
		if (lastCp === CharCodes.SEMI) this.consumed += 1;
		else if (this.decodeMode === DecodingMode.Strict) return 0;
		this.emitCodePoint((this.decodeTree === xmlDecodeTree ? replaceCodePointXML : replaceCodePoint)(this.result), this.consumed);
		if (this.errors) {
			if (lastCp !== CharCodes.SEMI) this.errors.missingSemicolonAfterCharacterReference();
			this.errors.validateNumericCharacterReference(this.result);
		}
		return this.consumed;
	}
	/**
	* Flush locally-tracked walk state back to the fields, then emit the
	* recorded legacy match or reject (cold path — at most once per
	* entity). Called after failed navigation (leaf node, branch miss, or
	* compact-run mismatch). In attribute mode, reject if no legacy was
	* recorded at the current node, if we descended past it, or if the
	* pending input character is an invalid attribute terminator.
	* @param consumed Locally-tracked consumed count.
	* @param excess Locally-tracked excess count.
	* @param char Pending input character (may be the mismatching char).
	* @param valueLength Value length at the current trie node.
	*/
	flushAndEmitLegacyOrReject(consumed, excess, char, valueLength) {
		this.consumed = consumed;
		this.excess = excess;
		return this.result === 0 || this.decodeMode === DecodingMode.Attribute && (valueLength === 0 || excess > 1 || isEntityInAttributeInvalidEnd(char)) ? 0 : this.emitNotTerminatedNamedEntity();
	}
	/**
	* Parses a named entity.
	*
	* Equivalent to the `Named character reference state` in the HTML spec.
	* @param input The string containing the entity (or a continuation of the entity).
	* @param offset The current offset.
	* @returns The number of characters that were consumed, or -1 if the entity is incomplete.
	*/
	stateNamedEntity(input, offset) {
		const { decodeTree } = this;
		const inputLength = input.length;
		const isStrict = this.decodeMode === DecodingMode.Strict;
		let { treeIndex } = this;
		let { excess } = this;
		let { consumed } = this;
		let current = decodeTree[treeIndex];
		while (offset < inputLength) {
			while ((current & (BinTrieFlags.VALUE_LENGTH | BinTrieFlags.FLAG13)) === 0 && (current & BinTrieFlags.JUMP_TABLE) !== 0) {
				const char = input.charCodeAt(offset);
				const jumpOffset = current & BinTrieFlags.JUMP_TABLE;
				const branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
				if (branchCount === 0) {
					if (char !== jumpOffset) return this.flushAndEmitLegacyOrReject(consumed, excess, char, 0);
					treeIndex += 1;
				} else {
					const slot = char - jumpOffset;
					if (slot >>> 0 >= branchCount) return this.flushAndEmitLegacyOrReject(consumed, excess, char, 0);
					const stored = decodeTree[treeIndex + 1 + slot];
					if (stored === 0) return this.flushAndEmitLegacyOrReject(consumed, excess, char, 0);
					treeIndex = treeIndex + branchCount + stored & 65535;
				}
				current = decodeTree[treeIndex];
				offset += 1;
				excess += 1;
				if (offset >= inputLength) break;
			}
			if (offset >= inputLength) break;
			if ((current & (BinTrieFlags.VALUE_LENGTH | BinTrieFlags.FLAG13)) === BinTrieFlags.FLAG13) {
				const runLength = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
				let { runConsumed } = this;
				if (runConsumed === 0) {
					const char = input.charCodeAt(offset);
					if (char !== (current & BinTrieFlags.JUMP_TABLE)) return this.flushAndEmitLegacyOrReject(consumed, excess, char, 0);
					offset += 1;
					excess += 1;
					runConsumed = 1;
				}
				while (runConsumed < runLength) {
					if (offset >= inputLength) {
						this.treeIndex = treeIndex;
						this.excess = excess;
						this.consumed = consumed;
						this.runConsumed = runConsumed;
						return -1;
					}
					const charIndexInPacked = runConsumed - 1;
					const expectedChar = decodeTree[treeIndex + 1 + (charIndexInPacked >> 1)] >> ((charIndexInPacked & 1) << 3) & 255;
					const char = input.charCodeAt(offset);
					if (char !== expectedChar) {
						this.runConsumed = 0;
						return this.flushAndEmitLegacyOrReject(consumed, excess, char, 0);
					}
					offset += 1;
					excess += 1;
					runConsumed += 1;
				}
				this.runConsumed = 0;
				treeIndex += 1 + (runLength >> 1);
				current = decodeTree[treeIndex];
				continue;
			}
			const valueLength = current >>> 14;
			const char = input.charCodeAt(offset);
			if (valueLength !== 0) {
				if (!isStrict && (current & BinTrieFlags.FLAG13) === 0) {
					this.result = treeIndex;
					consumed += excess - 1;
					excess = 1;
				}
				if (char === CharCodes.SEMI) return this.emitNamedEntityData(treeIndex, valueLength, consumed + excess);
				if (valueLength === 1) return this.flushAndEmitLegacyOrReject(consumed, excess, char, valueLength);
			}
			const next = determineBranch(decodeTree, current, treeIndex + (valueLength || 1), char);
			if (next < 0) return this.flushAndEmitLegacyOrReject(consumed, excess, char, valueLength);
			treeIndex = next;
			current = decodeTree[treeIndex];
			offset += 1;
			excess += 1;
		}
		if (!isStrict && current >>> 14 !== 0 && (current & BinTrieFlags.FLAG13) === 0) {
			this.result = treeIndex;
			consumed += excess - 1;
			excess = 1;
		}
		this.treeIndex = treeIndex;
		this.excess = excess;
		this.consumed = consumed;
		return -1;
	}
	/**
	* Emit a named entity that was not terminated with a semicolon.
	* @returns The number of characters consumed.
	*/
	emitNotTerminatedNamedEntity() {
		const { result, decodeTree } = this;
		const valueLength = decodeTree[result] >>> 14;
		this.emitNamedEntityData(result, valueLength, this.consumed);
		this.errors?.missingSemicolonAfterCharacterReference();
		return this.consumed;
	}
	/**
	* Emit a named entity.
	* @param result The index of the entity in the decode tree.
	* @param valueLength Encoded value length (header plus any value words).
	* @param consumed The number of characters consumed.
	* @returns The number of characters consumed.
	*/
	emitNamedEntityData(result, valueLength, consumed) {
		const { decodeTree } = this;
		this.emitCodePoint(valueLength === 1 ? decodeTree[result] & BinTrieFlags.VALUE_MASK : decodeTree[result + 1], consumed);
		if (valueLength === 3) this.emitCodePoint(decodeTree[result + 2], consumed);
		return consumed;
	}
	/**
	* Signal to the parser that the end of the input was reached.
	*
	* Remaining data will be emitted and relevant errors will be produced.
	* @returns The number of characters consumed.
	*/
	end() {
		switch (this.state) {
			case EntityDecoderState.NamedEntity: return this.result !== 0 && (this.decodeMode !== DecodingMode.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
			case EntityDecoderState.NumericDecimal: return this.emitNumericEntity(0, 2);
			case EntityDecoderState.NumericHex: return this.emitNumericEntity(0, 3);
			case EntityDecoderState.NumericStart:
				this.errors?.absenceOfDigitsInNumericCharacterReference(this.consumed);
				return 0;
			default: return 0;
		}
	}
};
/**
* Determines the branch of the current node that is taken given the current
* character. This function is used to traverse the trie.
*
* See `BinTrieFlags` for the branch-data layouts handled here.
* @param decodeTree The trie.
* @param current The current node's header word.
* @param nodeIndex Index of the node's first branch-data word (the header
*   plus any value words have been skipped by the caller).
* @param char The current character.
* @returns The index of the next node, or -1 if no branch is taken.
*/
function determineBranch(decodeTree, current, nodeIndex, char) {
	const branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
	const jumpOffset = current & BinTrieFlags.JUMP_TABLE;
	if (jumpOffset) {
		if (branchCount === 0) return char === jumpOffset ? nodeIndex : -1;
		const slot = char - jumpOffset;
		if (slot >>> 0 >= branchCount) return -1;
		const stored = decodeTree[nodeIndex + slot];
		return stored === 0 ? -1 : nodeIndex + branchCount + stored - 1 & 65535;
	}
	if (branchCount === 0) return -1;
	const packedKeySlots = branchCount + 1 >> 1;
	const branchEnd = nodeIndex + packedKeySlots + branchCount;
	for (let index = 0; index < branchCount; index++) {
		const key = decodeTree[nodeIndex + (index >> 1)] >> ((index & 1) << 3) & 255;
		if (key === char) return branchEnd + decodeTree[nodeIndex + packedKeySlots + index] & 65535;
		if (key > char) return -1;
	}
	return -1;
}
// ../../node_modules/.pnpm/parse5@8.0.1/node_modules/parse5/dist/common/html.js
/** All valid namespaces in HTML. */
var NS;
(function(NS) {
	NS["HTML"] = "http://www.w3.org/1999/xhtml";
	NS["MATHML"] = "http://www.w3.org/1998/Math/MathML";
	NS["SVG"] = "http://www.w3.org/2000/svg";
	NS["XLINK"] = "http://www.w3.org/1999/xlink";
	NS["XML"] = "http://www.w3.org/XML/1998/namespace";
	NS["XMLNS"] = "http://www.w3.org/2000/xmlns/";
})(NS || (NS = {}));
var ATTRS;
(function(ATTRS) {
	ATTRS["TYPE"] = "type";
	ATTRS["ACTION"] = "action";
	ATTRS["ENCODING"] = "encoding";
	ATTRS["PROMPT"] = "prompt";
	ATTRS["NAME"] = "name";
	ATTRS["COLOR"] = "color";
	ATTRS["FACE"] = "face";
	ATTRS["SIZE"] = "size";
})(ATTRS || (ATTRS = {}));
/**
* The mode of the document.
*
* @see {@link https://dom.spec.whatwg.org/#concept-document-limited-quirks}
*/
var DOCUMENT_MODE;
(function(DOCUMENT_MODE) {
	DOCUMENT_MODE["NO_QUIRKS"] = "no-quirks";
	DOCUMENT_MODE["QUIRKS"] = "quirks";
	DOCUMENT_MODE["LIMITED_QUIRKS"] = "limited-quirks";
})(DOCUMENT_MODE || (DOCUMENT_MODE = {}));
var TAG_NAMES;
(function(TAG_NAMES) {
	TAG_NAMES["A"] = "a";
	TAG_NAMES["ADDRESS"] = "address";
	TAG_NAMES["ANNOTATION_XML"] = "annotation-xml";
	TAG_NAMES["APPLET"] = "applet";
	TAG_NAMES["AREA"] = "area";
	TAG_NAMES["ARTICLE"] = "article";
	TAG_NAMES["ASIDE"] = "aside";
	TAG_NAMES["B"] = "b";
	TAG_NAMES["BASE"] = "base";
	TAG_NAMES["BASEFONT"] = "basefont";
	TAG_NAMES["BGSOUND"] = "bgsound";
	TAG_NAMES["BIG"] = "big";
	TAG_NAMES["BLOCKQUOTE"] = "blockquote";
	TAG_NAMES["BODY"] = "body";
	TAG_NAMES["BR"] = "br";
	TAG_NAMES["BUTTON"] = "button";
	TAG_NAMES["CAPTION"] = "caption";
	TAG_NAMES["CENTER"] = "center";
	TAG_NAMES["CODE"] = "code";
	TAG_NAMES["COL"] = "col";
	TAG_NAMES["COLGROUP"] = "colgroup";
	TAG_NAMES["DD"] = "dd";
	TAG_NAMES["DESC"] = "desc";
	TAG_NAMES["DETAILS"] = "details";
	TAG_NAMES["DIALOG"] = "dialog";
	TAG_NAMES["DIR"] = "dir";
	TAG_NAMES["DIV"] = "div";
	TAG_NAMES["DL"] = "dl";
	TAG_NAMES["DT"] = "dt";
	TAG_NAMES["EM"] = "em";
	TAG_NAMES["EMBED"] = "embed";
	TAG_NAMES["FIELDSET"] = "fieldset";
	TAG_NAMES["FIGCAPTION"] = "figcaption";
	TAG_NAMES["FIGURE"] = "figure";
	TAG_NAMES["FONT"] = "font";
	TAG_NAMES["FOOTER"] = "footer";
	TAG_NAMES["FOREIGN_OBJECT"] = "foreignObject";
	TAG_NAMES["FORM"] = "form";
	TAG_NAMES["FRAME"] = "frame";
	TAG_NAMES["FRAMESET"] = "frameset";
	TAG_NAMES["H1"] = "h1";
	TAG_NAMES["H2"] = "h2";
	TAG_NAMES["H3"] = "h3";
	TAG_NAMES["H4"] = "h4";
	TAG_NAMES["H5"] = "h5";
	TAG_NAMES["H6"] = "h6";
	TAG_NAMES["HEAD"] = "head";
	TAG_NAMES["HEADER"] = "header";
	TAG_NAMES["HGROUP"] = "hgroup";
	TAG_NAMES["HR"] = "hr";
	TAG_NAMES["HTML"] = "html";
	TAG_NAMES["I"] = "i";
	TAG_NAMES["IMG"] = "img";
	TAG_NAMES["IMAGE"] = "image";
	TAG_NAMES["INPUT"] = "input";
	TAG_NAMES["IFRAME"] = "iframe";
	TAG_NAMES["KEYGEN"] = "keygen";
	TAG_NAMES["LABEL"] = "label";
	TAG_NAMES["LI"] = "li";
	TAG_NAMES["LINK"] = "link";
	TAG_NAMES["LISTING"] = "listing";
	TAG_NAMES["MAIN"] = "main";
	TAG_NAMES["MALIGNMARK"] = "malignmark";
	TAG_NAMES["MARQUEE"] = "marquee";
	TAG_NAMES["MATH"] = "math";
	TAG_NAMES["MENU"] = "menu";
	TAG_NAMES["META"] = "meta";
	TAG_NAMES["MGLYPH"] = "mglyph";
	TAG_NAMES["MI"] = "mi";
	TAG_NAMES["MO"] = "mo";
	TAG_NAMES["MN"] = "mn";
	TAG_NAMES["MS"] = "ms";
	TAG_NAMES["MTEXT"] = "mtext";
	TAG_NAMES["NAV"] = "nav";
	TAG_NAMES["NOBR"] = "nobr";
	TAG_NAMES["NOFRAMES"] = "noframes";
	TAG_NAMES["NOEMBED"] = "noembed";
	TAG_NAMES["NOSCRIPT"] = "noscript";
	TAG_NAMES["OBJECT"] = "object";
	TAG_NAMES["OL"] = "ol";
	TAG_NAMES["OPTGROUP"] = "optgroup";
	TAG_NAMES["OPTION"] = "option";
	TAG_NAMES["P"] = "p";
	TAG_NAMES["PARAM"] = "param";
	TAG_NAMES["PLAINTEXT"] = "plaintext";
	TAG_NAMES["PRE"] = "pre";
	TAG_NAMES["RB"] = "rb";
	TAG_NAMES["RP"] = "rp";
	TAG_NAMES["RT"] = "rt";
	TAG_NAMES["RTC"] = "rtc";
	TAG_NAMES["RUBY"] = "ruby";
	TAG_NAMES["S"] = "s";
	TAG_NAMES["SCRIPT"] = "script";
	TAG_NAMES["SEARCH"] = "search";
	TAG_NAMES["SECTION"] = "section";
	TAG_NAMES["SELECT"] = "select";
	TAG_NAMES["SOURCE"] = "source";
	TAG_NAMES["SMALL"] = "small";
	TAG_NAMES["SPAN"] = "span";
	TAG_NAMES["STRIKE"] = "strike";
	TAG_NAMES["STRONG"] = "strong";
	TAG_NAMES["STYLE"] = "style";
	TAG_NAMES["SUB"] = "sub";
	TAG_NAMES["SUMMARY"] = "summary";
	TAG_NAMES["SUP"] = "sup";
	TAG_NAMES["TABLE"] = "table";
	TAG_NAMES["TBODY"] = "tbody";
	TAG_NAMES["TEMPLATE"] = "template";
	TAG_NAMES["TEXTAREA"] = "textarea";
	TAG_NAMES["TFOOT"] = "tfoot";
	TAG_NAMES["TD"] = "td";
	TAG_NAMES["TH"] = "th";
	TAG_NAMES["THEAD"] = "thead";
	TAG_NAMES["TITLE"] = "title";
	TAG_NAMES["TR"] = "tr";
	TAG_NAMES["TRACK"] = "track";
	TAG_NAMES["TT"] = "tt";
	TAG_NAMES["U"] = "u";
	TAG_NAMES["UL"] = "ul";
	TAG_NAMES["SVG"] = "svg";
	TAG_NAMES["VAR"] = "var";
	TAG_NAMES["WBR"] = "wbr";
	TAG_NAMES["XMP"] = "xmp";
})(TAG_NAMES || (TAG_NAMES = {}));
/**
* Tag IDs are numeric IDs for known tag names.
*
* We use tag IDs to improve the performance of tag name comparisons.
*/
var TAG_ID;
(function(TAG_ID) {
	TAG_ID[TAG_ID["UNKNOWN"] = 0] = "UNKNOWN";
	TAG_ID[TAG_ID["A"] = 1] = "A";
	TAG_ID[TAG_ID["ADDRESS"] = 2] = "ADDRESS";
	TAG_ID[TAG_ID["ANNOTATION_XML"] = 3] = "ANNOTATION_XML";
	TAG_ID[TAG_ID["APPLET"] = 4] = "APPLET";
	TAG_ID[TAG_ID["AREA"] = 5] = "AREA";
	TAG_ID[TAG_ID["ARTICLE"] = 6] = "ARTICLE";
	TAG_ID[TAG_ID["ASIDE"] = 7] = "ASIDE";
	TAG_ID[TAG_ID["B"] = 8] = "B";
	TAG_ID[TAG_ID["BASE"] = 9] = "BASE";
	TAG_ID[TAG_ID["BASEFONT"] = 10] = "BASEFONT";
	TAG_ID[TAG_ID["BGSOUND"] = 11] = "BGSOUND";
	TAG_ID[TAG_ID["BIG"] = 12] = "BIG";
	TAG_ID[TAG_ID["BLOCKQUOTE"] = 13] = "BLOCKQUOTE";
	TAG_ID[TAG_ID["BODY"] = 14] = "BODY";
	TAG_ID[TAG_ID["BR"] = 15] = "BR";
	TAG_ID[TAG_ID["BUTTON"] = 16] = "BUTTON";
	TAG_ID[TAG_ID["CAPTION"] = 17] = "CAPTION";
	TAG_ID[TAG_ID["CENTER"] = 18] = "CENTER";
	TAG_ID[TAG_ID["CODE"] = 19] = "CODE";
	TAG_ID[TAG_ID["COL"] = 20] = "COL";
	TAG_ID[TAG_ID["COLGROUP"] = 21] = "COLGROUP";
	TAG_ID[TAG_ID["DD"] = 22] = "DD";
	TAG_ID[TAG_ID["DESC"] = 23] = "DESC";
	TAG_ID[TAG_ID["DETAILS"] = 24] = "DETAILS";
	TAG_ID[TAG_ID["DIALOG"] = 25] = "DIALOG";
	TAG_ID[TAG_ID["DIR"] = 26] = "DIR";
	TAG_ID[TAG_ID["DIV"] = 27] = "DIV";
	TAG_ID[TAG_ID["DL"] = 28] = "DL";
	TAG_ID[TAG_ID["DT"] = 29] = "DT";
	TAG_ID[TAG_ID["EM"] = 30] = "EM";
	TAG_ID[TAG_ID["EMBED"] = 31] = "EMBED";
	TAG_ID[TAG_ID["FIELDSET"] = 32] = "FIELDSET";
	TAG_ID[TAG_ID["FIGCAPTION"] = 33] = "FIGCAPTION";
	TAG_ID[TAG_ID["FIGURE"] = 34] = "FIGURE";
	TAG_ID[TAG_ID["FONT"] = 35] = "FONT";
	TAG_ID[TAG_ID["FOOTER"] = 36] = "FOOTER";
	TAG_ID[TAG_ID["FOREIGN_OBJECT"] = 37] = "FOREIGN_OBJECT";
	TAG_ID[TAG_ID["FORM"] = 38] = "FORM";
	TAG_ID[TAG_ID["FRAME"] = 39] = "FRAME";
	TAG_ID[TAG_ID["FRAMESET"] = 40] = "FRAMESET";
	TAG_ID[TAG_ID["H1"] = 41] = "H1";
	TAG_ID[TAG_ID["H2"] = 42] = "H2";
	TAG_ID[TAG_ID["H3"] = 43] = "H3";
	TAG_ID[TAG_ID["H4"] = 44] = "H4";
	TAG_ID[TAG_ID["H5"] = 45] = "H5";
	TAG_ID[TAG_ID["H6"] = 46] = "H6";
	TAG_ID[TAG_ID["HEAD"] = 47] = "HEAD";
	TAG_ID[TAG_ID["HEADER"] = 48] = "HEADER";
	TAG_ID[TAG_ID["HGROUP"] = 49] = "HGROUP";
	TAG_ID[TAG_ID["HR"] = 50] = "HR";
	TAG_ID[TAG_ID["HTML"] = 51] = "HTML";
	TAG_ID[TAG_ID["I"] = 52] = "I";
	TAG_ID[TAG_ID["IMG"] = 53] = "IMG";
	TAG_ID[TAG_ID["IMAGE"] = 54] = "IMAGE";
	TAG_ID[TAG_ID["INPUT"] = 55] = "INPUT";
	TAG_ID[TAG_ID["IFRAME"] = 56] = "IFRAME";
	TAG_ID[TAG_ID["KEYGEN"] = 57] = "KEYGEN";
	TAG_ID[TAG_ID["LABEL"] = 58] = "LABEL";
	TAG_ID[TAG_ID["LI"] = 59] = "LI";
	TAG_ID[TAG_ID["LINK"] = 60] = "LINK";
	TAG_ID[TAG_ID["LISTING"] = 61] = "LISTING";
	TAG_ID[TAG_ID["MAIN"] = 62] = "MAIN";
	TAG_ID[TAG_ID["MALIGNMARK"] = 63] = "MALIGNMARK";
	TAG_ID[TAG_ID["MARQUEE"] = 64] = "MARQUEE";
	TAG_ID[TAG_ID["MATH"] = 65] = "MATH";
	TAG_ID[TAG_ID["MENU"] = 66] = "MENU";
	TAG_ID[TAG_ID["META"] = 67] = "META";
	TAG_ID[TAG_ID["MGLYPH"] = 68] = "MGLYPH";
	TAG_ID[TAG_ID["MI"] = 69] = "MI";
	TAG_ID[TAG_ID["MO"] = 70] = "MO";
	TAG_ID[TAG_ID["MN"] = 71] = "MN";
	TAG_ID[TAG_ID["MS"] = 72] = "MS";
	TAG_ID[TAG_ID["MTEXT"] = 73] = "MTEXT";
	TAG_ID[TAG_ID["NAV"] = 74] = "NAV";
	TAG_ID[TAG_ID["NOBR"] = 75] = "NOBR";
	TAG_ID[TAG_ID["NOFRAMES"] = 76] = "NOFRAMES";
	TAG_ID[TAG_ID["NOEMBED"] = 77] = "NOEMBED";
	TAG_ID[TAG_ID["NOSCRIPT"] = 78] = "NOSCRIPT";
	TAG_ID[TAG_ID["OBJECT"] = 79] = "OBJECT";
	TAG_ID[TAG_ID["OL"] = 80] = "OL";
	TAG_ID[TAG_ID["OPTGROUP"] = 81] = "OPTGROUP";
	TAG_ID[TAG_ID["OPTION"] = 82] = "OPTION";
	TAG_ID[TAG_ID["P"] = 83] = "P";
	TAG_ID[TAG_ID["PARAM"] = 84] = "PARAM";
	TAG_ID[TAG_ID["PLAINTEXT"] = 85] = "PLAINTEXT";
	TAG_ID[TAG_ID["PRE"] = 86] = "PRE";
	TAG_ID[TAG_ID["RB"] = 87] = "RB";
	TAG_ID[TAG_ID["RP"] = 88] = "RP";
	TAG_ID[TAG_ID["RT"] = 89] = "RT";
	TAG_ID[TAG_ID["RTC"] = 90] = "RTC";
	TAG_ID[TAG_ID["RUBY"] = 91] = "RUBY";
	TAG_ID[TAG_ID["S"] = 92] = "S";
	TAG_ID[TAG_ID["SCRIPT"] = 93] = "SCRIPT";
	TAG_ID[TAG_ID["SEARCH"] = 94] = "SEARCH";
	TAG_ID[TAG_ID["SECTION"] = 95] = "SECTION";
	TAG_ID[TAG_ID["SELECT"] = 96] = "SELECT";
	TAG_ID[TAG_ID["SOURCE"] = 97] = "SOURCE";
	TAG_ID[TAG_ID["SMALL"] = 98] = "SMALL";
	TAG_ID[TAG_ID["SPAN"] = 99] = "SPAN";
	TAG_ID[TAG_ID["STRIKE"] = 100] = "STRIKE";
	TAG_ID[TAG_ID["STRONG"] = 101] = "STRONG";
	TAG_ID[TAG_ID["STYLE"] = 102] = "STYLE";
	TAG_ID[TAG_ID["SUB"] = 103] = "SUB";
	TAG_ID[TAG_ID["SUMMARY"] = 104] = "SUMMARY";
	TAG_ID[TAG_ID["SUP"] = 105] = "SUP";
	TAG_ID[TAG_ID["TABLE"] = 106] = "TABLE";
	TAG_ID[TAG_ID["TBODY"] = 107] = "TBODY";
	TAG_ID[TAG_ID["TEMPLATE"] = 108] = "TEMPLATE";
	TAG_ID[TAG_ID["TEXTAREA"] = 109] = "TEXTAREA";
	TAG_ID[TAG_ID["TFOOT"] = 110] = "TFOOT";
	TAG_ID[TAG_ID["TD"] = 111] = "TD";
	TAG_ID[TAG_ID["TH"] = 112] = "TH";
	TAG_ID[TAG_ID["THEAD"] = 113] = "THEAD";
	TAG_ID[TAG_ID["TITLE"] = 114] = "TITLE";
	TAG_ID[TAG_ID["TR"] = 115] = "TR";
	TAG_ID[TAG_ID["TRACK"] = 116] = "TRACK";
	TAG_ID[TAG_ID["TT"] = 117] = "TT";
	TAG_ID[TAG_ID["U"] = 118] = "U";
	TAG_ID[TAG_ID["UL"] = 119] = "UL";
	TAG_ID[TAG_ID["SVG"] = 120] = "SVG";
	TAG_ID[TAG_ID["VAR"] = 121] = "VAR";
	TAG_ID[TAG_ID["WBR"] = 122] = "WBR";
	TAG_ID[TAG_ID["XMP"] = 123] = "XMP";
})(TAG_ID || (TAG_ID = {}));
const TAG_NAME_TO_ID = /* @__PURE__ */ new Map([
	[TAG_NAMES.A, TAG_ID.A],
	[TAG_NAMES.ADDRESS, TAG_ID.ADDRESS],
	[TAG_NAMES.ANNOTATION_XML, TAG_ID.ANNOTATION_XML],
	[TAG_NAMES.APPLET, TAG_ID.APPLET],
	[TAG_NAMES.AREA, TAG_ID.AREA],
	[TAG_NAMES.ARTICLE, TAG_ID.ARTICLE],
	[TAG_NAMES.ASIDE, TAG_ID.ASIDE],
	[TAG_NAMES.B, TAG_ID.B],
	[TAG_NAMES.BASE, TAG_ID.BASE],
	[TAG_NAMES.BASEFONT, TAG_ID.BASEFONT],
	[TAG_NAMES.BGSOUND, TAG_ID.BGSOUND],
	[TAG_NAMES.BIG, TAG_ID.BIG],
	[TAG_NAMES.BLOCKQUOTE, TAG_ID.BLOCKQUOTE],
	[TAG_NAMES.BODY, TAG_ID.BODY],
	[TAG_NAMES.BR, TAG_ID.BR],
	[TAG_NAMES.BUTTON, TAG_ID.BUTTON],
	[TAG_NAMES.CAPTION, TAG_ID.CAPTION],
	[TAG_NAMES.CENTER, TAG_ID.CENTER],
	[TAG_NAMES.CODE, TAG_ID.CODE],
	[TAG_NAMES.COL, TAG_ID.COL],
	[TAG_NAMES.COLGROUP, TAG_ID.COLGROUP],
	[TAG_NAMES.DD, TAG_ID.DD],
	[TAG_NAMES.DESC, TAG_ID.DESC],
	[TAG_NAMES.DETAILS, TAG_ID.DETAILS],
	[TAG_NAMES.DIALOG, TAG_ID.DIALOG],
	[TAG_NAMES.DIR, TAG_ID.DIR],
	[TAG_NAMES.DIV, TAG_ID.DIV],
	[TAG_NAMES.DL, TAG_ID.DL],
	[TAG_NAMES.DT, TAG_ID.DT],
	[TAG_NAMES.EM, TAG_ID.EM],
	[TAG_NAMES.EMBED, TAG_ID.EMBED],
	[TAG_NAMES.FIELDSET, TAG_ID.FIELDSET],
	[TAG_NAMES.FIGCAPTION, TAG_ID.FIGCAPTION],
	[TAG_NAMES.FIGURE, TAG_ID.FIGURE],
	[TAG_NAMES.FONT, TAG_ID.FONT],
	[TAG_NAMES.FOOTER, TAG_ID.FOOTER],
	[TAG_NAMES.FOREIGN_OBJECT, TAG_ID.FOREIGN_OBJECT],
	[TAG_NAMES.FORM, TAG_ID.FORM],
	[TAG_NAMES.FRAME, TAG_ID.FRAME],
	[TAG_NAMES.FRAMESET, TAG_ID.FRAMESET],
	[TAG_NAMES.H1, TAG_ID.H1],
	[TAG_NAMES.H2, TAG_ID.H2],
	[TAG_NAMES.H3, TAG_ID.H3],
	[TAG_NAMES.H4, TAG_ID.H4],
	[TAG_NAMES.H5, TAG_ID.H5],
	[TAG_NAMES.H6, TAG_ID.H6],
	[TAG_NAMES.HEAD, TAG_ID.HEAD],
	[TAG_NAMES.HEADER, TAG_ID.HEADER],
	[TAG_NAMES.HGROUP, TAG_ID.HGROUP],
	[TAG_NAMES.HR, TAG_ID.HR],
	[TAG_NAMES.HTML, TAG_ID.HTML],
	[TAG_NAMES.I, TAG_ID.I],
	[TAG_NAMES.IMG, TAG_ID.IMG],
	[TAG_NAMES.IMAGE, TAG_ID.IMAGE],
	[TAG_NAMES.INPUT, TAG_ID.INPUT],
	[TAG_NAMES.IFRAME, TAG_ID.IFRAME],
	[TAG_NAMES.KEYGEN, TAG_ID.KEYGEN],
	[TAG_NAMES.LABEL, TAG_ID.LABEL],
	[TAG_NAMES.LI, TAG_ID.LI],
	[TAG_NAMES.LINK, TAG_ID.LINK],
	[TAG_NAMES.LISTING, TAG_ID.LISTING],
	[TAG_NAMES.MAIN, TAG_ID.MAIN],
	[TAG_NAMES.MALIGNMARK, TAG_ID.MALIGNMARK],
	[TAG_NAMES.MARQUEE, TAG_ID.MARQUEE],
	[TAG_NAMES.MATH, TAG_ID.MATH],
	[TAG_NAMES.MENU, TAG_ID.MENU],
	[TAG_NAMES.META, TAG_ID.META],
	[TAG_NAMES.MGLYPH, TAG_ID.MGLYPH],
	[TAG_NAMES.MI, TAG_ID.MI],
	[TAG_NAMES.MO, TAG_ID.MO],
	[TAG_NAMES.MN, TAG_ID.MN],
	[TAG_NAMES.MS, TAG_ID.MS],
	[TAG_NAMES.MTEXT, TAG_ID.MTEXT],
	[TAG_NAMES.NAV, TAG_ID.NAV],
	[TAG_NAMES.NOBR, TAG_ID.NOBR],
	[TAG_NAMES.NOFRAMES, TAG_ID.NOFRAMES],
	[TAG_NAMES.NOEMBED, TAG_ID.NOEMBED],
	[TAG_NAMES.NOSCRIPT, TAG_ID.NOSCRIPT],
	[TAG_NAMES.OBJECT, TAG_ID.OBJECT],
	[TAG_NAMES.OL, TAG_ID.OL],
	[TAG_NAMES.OPTGROUP, TAG_ID.OPTGROUP],
	[TAG_NAMES.OPTION, TAG_ID.OPTION],
	[TAG_NAMES.P, TAG_ID.P],
	[TAG_NAMES.PARAM, TAG_ID.PARAM],
	[TAG_NAMES.PLAINTEXT, TAG_ID.PLAINTEXT],
	[TAG_NAMES.PRE, TAG_ID.PRE],
	[TAG_NAMES.RB, TAG_ID.RB],
	[TAG_NAMES.RP, TAG_ID.RP],
	[TAG_NAMES.RT, TAG_ID.RT],
	[TAG_NAMES.RTC, TAG_ID.RTC],
	[TAG_NAMES.RUBY, TAG_ID.RUBY],
	[TAG_NAMES.S, TAG_ID.S],
	[TAG_NAMES.SCRIPT, TAG_ID.SCRIPT],
	[TAG_NAMES.SEARCH, TAG_ID.SEARCH],
	[TAG_NAMES.SECTION, TAG_ID.SECTION],
	[TAG_NAMES.SELECT, TAG_ID.SELECT],
	[TAG_NAMES.SOURCE, TAG_ID.SOURCE],
	[TAG_NAMES.SMALL, TAG_ID.SMALL],
	[TAG_NAMES.SPAN, TAG_ID.SPAN],
	[TAG_NAMES.STRIKE, TAG_ID.STRIKE],
	[TAG_NAMES.STRONG, TAG_ID.STRONG],
	[TAG_NAMES.STYLE, TAG_ID.STYLE],
	[TAG_NAMES.SUB, TAG_ID.SUB],
	[TAG_NAMES.SUMMARY, TAG_ID.SUMMARY],
	[TAG_NAMES.SUP, TAG_ID.SUP],
	[TAG_NAMES.TABLE, TAG_ID.TABLE],
	[TAG_NAMES.TBODY, TAG_ID.TBODY],
	[TAG_NAMES.TEMPLATE, TAG_ID.TEMPLATE],
	[TAG_NAMES.TEXTAREA, TAG_ID.TEXTAREA],
	[TAG_NAMES.TFOOT, TAG_ID.TFOOT],
	[TAG_NAMES.TD, TAG_ID.TD],
	[TAG_NAMES.TH, TAG_ID.TH],
	[TAG_NAMES.THEAD, TAG_ID.THEAD],
	[TAG_NAMES.TITLE, TAG_ID.TITLE],
	[TAG_NAMES.TR, TAG_ID.TR],
	[TAG_NAMES.TRACK, TAG_ID.TRACK],
	[TAG_NAMES.TT, TAG_ID.TT],
	[TAG_NAMES.U, TAG_ID.U],
	[TAG_NAMES.UL, TAG_ID.UL],
	[TAG_NAMES.SVG, TAG_ID.SVG],
	[TAG_NAMES.VAR, TAG_ID.VAR],
	[TAG_NAMES.WBR, TAG_ID.WBR],
	[TAG_NAMES.XMP, TAG_ID.XMP]
]);
function getTagID(tagName) {
	var _a;
	return (_a = TAG_NAME_TO_ID.get(tagName)) !== null && _a !== void 0 ? _a : TAG_ID.UNKNOWN;
}
const $ = TAG_ID;
const SPECIAL_ELEMENTS = {
	[NS.HTML]: /* @__PURE__ */ new Set([
		$.ADDRESS,
		$.APPLET,
		$.AREA,
		$.ARTICLE,
		$.ASIDE,
		$.BASE,
		$.BASEFONT,
		$.BGSOUND,
		$.BLOCKQUOTE,
		$.BODY,
		$.BR,
		$.BUTTON,
		$.CAPTION,
		$.CENTER,
		$.COL,
		$.COLGROUP,
		$.DD,
		$.DETAILS,
		$.DIR,
		$.DIV,
		$.DL,
		$.DT,
		$.EMBED,
		$.FIELDSET,
		$.FIGCAPTION,
		$.FIGURE,
		$.FOOTER,
		$.FORM,
		$.FRAME,
		$.FRAMESET,
		$.H1,
		$.H2,
		$.H3,
		$.H4,
		$.H5,
		$.H6,
		$.HEAD,
		$.HEADER,
		$.HGROUP,
		$.HR,
		$.HTML,
		$.IFRAME,
		$.IMG,
		$.INPUT,
		$.LI,
		$.LINK,
		$.LISTING,
		$.MAIN,
		$.MARQUEE,
		$.MENU,
		$.META,
		$.NAV,
		$.NOEMBED,
		$.NOFRAMES,
		$.NOSCRIPT,
		$.OBJECT,
		$.OL,
		$.P,
		$.PARAM,
		$.PLAINTEXT,
		$.PRE,
		$.SCRIPT,
		$.SECTION,
		$.SELECT,
		$.SOURCE,
		$.STYLE,
		$.SUMMARY,
		$.TABLE,
		$.TBODY,
		$.TD,
		$.TEMPLATE,
		$.TEXTAREA,
		$.TFOOT,
		$.TH,
		$.THEAD,
		$.TITLE,
		$.TR,
		$.TRACK,
		$.UL,
		$.WBR,
		$.XMP
	]),
	[NS.MATHML]: /* @__PURE__ */ new Set([
		$.MI,
		$.MO,
		$.MN,
		$.MS,
		$.MTEXT,
		$.ANNOTATION_XML
	]),
	[NS.SVG]: /* @__PURE__ */ new Set([
		$.TITLE,
		$.FOREIGN_OBJECT,
		$.DESC
	]),
	[NS.XLINK]: /* @__PURE__ */ new Set(),
	[NS.XML]: /* @__PURE__ */ new Set(),
	[NS.XMLNS]: /* @__PURE__ */ new Set()
};
const NUMBERED_HEADERS = /* @__PURE__ */ new Set([
	$.H1,
	$.H2,
	$.H3,
	$.H4,
	$.H5,
	$.H6
]);
// ../../node_modules/.pnpm/parse5@8.0.1/node_modules/parse5/dist/tokenizer/index.js
var State;
(function(State) {
	State[State["DATA"] = 0] = "DATA";
	State[State["RCDATA"] = 1] = "RCDATA";
	State[State["RAWTEXT"] = 2] = "RAWTEXT";
	State[State["SCRIPT_DATA"] = 3] = "SCRIPT_DATA";
	State[State["PLAINTEXT"] = 4] = "PLAINTEXT";
	State[State["TAG_OPEN"] = 5] = "TAG_OPEN";
	State[State["END_TAG_OPEN"] = 6] = "END_TAG_OPEN";
	State[State["TAG_NAME"] = 7] = "TAG_NAME";
	State[State["RCDATA_LESS_THAN_SIGN"] = 8] = "RCDATA_LESS_THAN_SIGN";
	State[State["RCDATA_END_TAG_OPEN"] = 9] = "RCDATA_END_TAG_OPEN";
	State[State["RCDATA_END_TAG_NAME"] = 10] = "RCDATA_END_TAG_NAME";
	State[State["RAWTEXT_LESS_THAN_SIGN"] = 11] = "RAWTEXT_LESS_THAN_SIGN";
	State[State["RAWTEXT_END_TAG_OPEN"] = 12] = "RAWTEXT_END_TAG_OPEN";
	State[State["RAWTEXT_END_TAG_NAME"] = 13] = "RAWTEXT_END_TAG_NAME";
	State[State["SCRIPT_DATA_LESS_THAN_SIGN"] = 14] = "SCRIPT_DATA_LESS_THAN_SIGN";
	State[State["SCRIPT_DATA_END_TAG_OPEN"] = 15] = "SCRIPT_DATA_END_TAG_OPEN";
	State[State["SCRIPT_DATA_END_TAG_NAME"] = 16] = "SCRIPT_DATA_END_TAG_NAME";
	State[State["SCRIPT_DATA_ESCAPE_START"] = 17] = "SCRIPT_DATA_ESCAPE_START";
	State[State["SCRIPT_DATA_ESCAPE_START_DASH"] = 18] = "SCRIPT_DATA_ESCAPE_START_DASH";
	State[State["SCRIPT_DATA_ESCAPED"] = 19] = "SCRIPT_DATA_ESCAPED";
	State[State["SCRIPT_DATA_ESCAPED_DASH"] = 20] = "SCRIPT_DATA_ESCAPED_DASH";
	State[State["SCRIPT_DATA_ESCAPED_DASH_DASH"] = 21] = "SCRIPT_DATA_ESCAPED_DASH_DASH";
	State[State["SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN"] = 22] = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN";
	State[State["SCRIPT_DATA_ESCAPED_END_TAG_OPEN"] = 23] = "SCRIPT_DATA_ESCAPED_END_TAG_OPEN";
	State[State["SCRIPT_DATA_ESCAPED_END_TAG_NAME"] = 24] = "SCRIPT_DATA_ESCAPED_END_TAG_NAME";
	State[State["SCRIPT_DATA_DOUBLE_ESCAPE_START"] = 25] = "SCRIPT_DATA_DOUBLE_ESCAPE_START";
	State[State["SCRIPT_DATA_DOUBLE_ESCAPED"] = 26] = "SCRIPT_DATA_DOUBLE_ESCAPED";
	State[State["SCRIPT_DATA_DOUBLE_ESCAPED_DASH"] = 27] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH";
	State[State["SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH"] = 28] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH";
	State[State["SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN"] = 29] = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN";
	State[State["SCRIPT_DATA_DOUBLE_ESCAPE_END"] = 30] = "SCRIPT_DATA_DOUBLE_ESCAPE_END";
	State[State["BEFORE_ATTRIBUTE_NAME"] = 31] = "BEFORE_ATTRIBUTE_NAME";
	State[State["ATTRIBUTE_NAME"] = 32] = "ATTRIBUTE_NAME";
	State[State["AFTER_ATTRIBUTE_NAME"] = 33] = "AFTER_ATTRIBUTE_NAME";
	State[State["BEFORE_ATTRIBUTE_VALUE"] = 34] = "BEFORE_ATTRIBUTE_VALUE";
	State[State["ATTRIBUTE_VALUE_DOUBLE_QUOTED"] = 35] = "ATTRIBUTE_VALUE_DOUBLE_QUOTED";
	State[State["ATTRIBUTE_VALUE_SINGLE_QUOTED"] = 36] = "ATTRIBUTE_VALUE_SINGLE_QUOTED";
	State[State["ATTRIBUTE_VALUE_UNQUOTED"] = 37] = "ATTRIBUTE_VALUE_UNQUOTED";
	State[State["AFTER_ATTRIBUTE_VALUE_QUOTED"] = 38] = "AFTER_ATTRIBUTE_VALUE_QUOTED";
	State[State["SELF_CLOSING_START_TAG"] = 39] = "SELF_CLOSING_START_TAG";
	State[State["BOGUS_COMMENT"] = 40] = "BOGUS_COMMENT";
	State[State["MARKUP_DECLARATION_OPEN"] = 41] = "MARKUP_DECLARATION_OPEN";
	State[State["COMMENT_START"] = 42] = "COMMENT_START";
	State[State["COMMENT_START_DASH"] = 43] = "COMMENT_START_DASH";
	State[State["COMMENT"] = 44] = "COMMENT";
	State[State["COMMENT_LESS_THAN_SIGN"] = 45] = "COMMENT_LESS_THAN_SIGN";
	State[State["COMMENT_LESS_THAN_SIGN_BANG"] = 46] = "COMMENT_LESS_THAN_SIGN_BANG";
	State[State["COMMENT_LESS_THAN_SIGN_BANG_DASH"] = 47] = "COMMENT_LESS_THAN_SIGN_BANG_DASH";
	State[State["COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH"] = 48] = "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH";
	State[State["COMMENT_END_DASH"] = 49] = "COMMENT_END_DASH";
	State[State["COMMENT_END"] = 50] = "COMMENT_END";
	State[State["COMMENT_END_BANG"] = 51] = "COMMENT_END_BANG";
	State[State["DOCTYPE"] = 52] = "DOCTYPE";
	State[State["BEFORE_DOCTYPE_NAME"] = 53] = "BEFORE_DOCTYPE_NAME";
	State[State["DOCTYPE_NAME"] = 54] = "DOCTYPE_NAME";
	State[State["AFTER_DOCTYPE_NAME"] = 55] = "AFTER_DOCTYPE_NAME";
	State[State["AFTER_DOCTYPE_PUBLIC_KEYWORD"] = 56] = "AFTER_DOCTYPE_PUBLIC_KEYWORD";
	State[State["BEFORE_DOCTYPE_PUBLIC_IDENTIFIER"] = 57] = "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER";
	State[State["DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED"] = 58] = "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED";
	State[State["DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED"] = 59] = "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED";
	State[State["AFTER_DOCTYPE_PUBLIC_IDENTIFIER"] = 60] = "AFTER_DOCTYPE_PUBLIC_IDENTIFIER";
	State[State["BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS"] = 61] = "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS";
	State[State["AFTER_DOCTYPE_SYSTEM_KEYWORD"] = 62] = "AFTER_DOCTYPE_SYSTEM_KEYWORD";
	State[State["BEFORE_DOCTYPE_SYSTEM_IDENTIFIER"] = 63] = "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER";
	State[State["DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED"] = 64] = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED";
	State[State["DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED"] = 65] = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED";
	State[State["AFTER_DOCTYPE_SYSTEM_IDENTIFIER"] = 66] = "AFTER_DOCTYPE_SYSTEM_IDENTIFIER";
	State[State["BOGUS_DOCTYPE"] = 67] = "BOGUS_DOCTYPE";
	State[State["CDATA_SECTION"] = 68] = "CDATA_SECTION";
	State[State["CDATA_SECTION_BRACKET"] = 69] = "CDATA_SECTION_BRACKET";
	State[State["CDATA_SECTION_END"] = 70] = "CDATA_SECTION_END";
	State[State["CHARACTER_REFERENCE"] = 71] = "CHARACTER_REFERENCE";
	State[State["AMBIGUOUS_AMPERSAND"] = 72] = "AMBIGUOUS_AMPERSAND";
})(State || (State = {}));
const TokenizerMode = {
	DATA: State.DATA,
	RCDATA: State.RCDATA,
	RAWTEXT: State.RAWTEXT,
	SCRIPT_DATA: State.SCRIPT_DATA,
	PLAINTEXT: State.PLAINTEXT,
	CDATA_SECTION: State.CDATA_SECTION
};
function isAsciiDigit(cp) {
	return cp >= CODE_POINTS.DIGIT_0 && cp <= CODE_POINTS.DIGIT_9;
}
function isAsciiUpper(cp) {
	return cp >= CODE_POINTS.LATIN_CAPITAL_A && cp <= CODE_POINTS.LATIN_CAPITAL_Z;
}
function isAsciiLower(cp) {
	return cp >= CODE_POINTS.LATIN_SMALL_A && cp <= CODE_POINTS.LATIN_SMALL_Z;
}
function isAsciiLetter(cp) {
	return isAsciiLower(cp) || isAsciiUpper(cp);
}
function isAsciiAlphaNumeric(cp) {
	return isAsciiLetter(cp) || isAsciiDigit(cp);
}
function toAsciiLower(cp) {
	return cp + 32;
}
function isWhitespace(cp) {
	return cp === CODE_POINTS.SPACE || cp === CODE_POINTS.LINE_FEED || cp === CODE_POINTS.TABULATION || cp === CODE_POINTS.FORM_FEED;
}
function isScriptDataDoubleEscapeSequenceEnd(cp) {
	return isWhitespace(cp) || cp === CODE_POINTS.SOLIDUS || cp === CODE_POINTS.GREATER_THAN_SIGN;
}
function getErrorForNumericCharacterReference(code) {
	if (code === CODE_POINTS.NULL) return ERR.nullCharacterReference;
	else if (code > 1114111) return ERR.characterReferenceOutsideUnicodeRange;
	else if (isSurrogate(code)) return ERR.surrogateCharacterReference;
	else if (isUndefinedCodePoint(code)) return ERR.noncharacterCharacterReference;
	else if (isControlCodePoint(code) || code === CODE_POINTS.CARRIAGE_RETURN) return ERR.controlCharacterReference;
	return null;
}
var Tokenizer = class {
	constructor(options, handler) {
		this.options = options;
		this.handler = handler;
		this.paused = false;
		/** Ensures that the parsing loop isn't run multiple times at once. */
		this.inLoop = false;
		/**
		* Indicates that the current adjusted node exists, is not an element in the HTML namespace,
		* and that it is not an integration point for either MathML or HTML.
		*
		* @see {@link https://html.spec.whatwg.org/multipage/parsing.html#tree-construction}
		*/
		this.inForeignNode = false;
		this.lastStartTagName = "";
		this.active = false;
		this.state = State.DATA;
		this.returnState = State.DATA;
		this.entityStartPos = 0;
		this.consumedAfterSnapshot = -1;
		this.currentCharacterToken = null;
		this.currentToken = null;
		this.currentAttr = {
			name: "",
			value: ""
		};
		this.preprocessor = new Preprocessor(handler);
		this.currentLocation = this.getCurrentLocation(-1);
		this.entityDecoder = new EntityDecoder(htmlDecodeTree, (cp, consumed) => {
			this.preprocessor.pos = this.entityStartPos + consumed - 1;
			this._flushCodePointConsumedAsCharacterReference(cp);
		}, handler.onParseError ? {
			missingSemicolonAfterCharacterReference: () => {
				this._err(ERR.missingSemicolonAfterCharacterReference, 1);
			},
			absenceOfDigitsInNumericCharacterReference: (consumed) => {
				this._err(ERR.absenceOfDigitsInNumericCharacterReference, this.entityStartPos - this.preprocessor.pos + consumed);
			},
			validateNumericCharacterReference: (code) => {
				const error = getErrorForNumericCharacterReference(code);
				if (error) this._err(error, 1);
			}
		} : void 0);
	}
	_err(code, cpOffset = 0) {
		var _a, _b;
		(_b = (_a = this.handler).onParseError) === null || _b === void 0 || _b.call(_a, this.preprocessor.getError(code, cpOffset));
	}
	getCurrentLocation(offset) {
		if (!this.options.sourceCodeLocationInfo) return null;
		return {
			startLine: this.preprocessor.line,
			startCol: this.preprocessor.col - offset,
			startOffset: this.preprocessor.offset - offset,
			endLine: -1,
			endCol: -1,
			endOffset: -1
		};
	}
	_runParsingLoop() {
		if (this.inLoop) return;
		this.inLoop = true;
		while (this.active && !this.paused) {
			this.consumedAfterSnapshot = 0;
			const cp = this._consume();
			if (!this._ensureHibernation()) this._callState(cp);
		}
		this.inLoop = false;
	}
	pause() {
		this.paused = true;
	}
	resume(writeCallback) {
		if (!this.paused) throw new Error("Parser was already resumed");
		this.paused = false;
		if (this.inLoop) return;
		this._runParsingLoop();
		if (!this.paused) writeCallback === null || writeCallback === void 0 || writeCallback();
	}
	write(chunk, isLastChunk, writeCallback) {
		this.active = true;
		this.preprocessor.write(chunk, isLastChunk);
		this._runParsingLoop();
		if (!this.paused) writeCallback === null || writeCallback === void 0 || writeCallback();
	}
	insertHtmlAtCurrentPos(chunk) {
		this.active = true;
		this.preprocessor.insertHtmlAtCurrentPos(chunk);
		this._runParsingLoop();
	}
	_ensureHibernation() {
		if (this.preprocessor.endOfChunkHit) {
			this.preprocessor.retreat(this.consumedAfterSnapshot);
			this.consumedAfterSnapshot = 0;
			this.active = false;
			return true;
		}
		return false;
	}
	_consume() {
		this.consumedAfterSnapshot++;
		return this.preprocessor.advance();
	}
	_advanceBy(count) {
		this.consumedAfterSnapshot += count;
		for (let i = 0; i < count; i++) this.preprocessor.advance();
	}
	_consumeSequenceIfMatch(pattern, caseSensitive) {
		if (this.preprocessor.startsWith(pattern, caseSensitive)) {
			this._advanceBy(pattern.length - 1);
			return true;
		}
		return false;
	}
	_createStartTagToken() {
		this.currentToken = {
			type: TokenType.START_TAG,
			tagName: "",
			tagID: TAG_ID.UNKNOWN,
			selfClosing: false,
			ackSelfClosing: false,
			attrs: [],
			location: this.getCurrentLocation(1)
		};
	}
	_createEndTagToken() {
		this.currentToken = {
			type: TokenType.END_TAG,
			tagName: "",
			tagID: TAG_ID.UNKNOWN,
			selfClosing: false,
			ackSelfClosing: false,
			attrs: [],
			location: this.getCurrentLocation(2)
		};
	}
	_createCommentToken(offset) {
		this.currentToken = {
			type: TokenType.COMMENT,
			data: "",
			location: this.getCurrentLocation(offset)
		};
	}
	_createDoctypeToken(initialName) {
		this.currentToken = {
			type: TokenType.DOCTYPE,
			name: initialName,
			forceQuirks: false,
			publicId: null,
			systemId: null,
			location: this.currentLocation
		};
	}
	_createCharacterToken(type, chars) {
		this.currentCharacterToken = {
			type,
			chars,
			location: this.currentLocation
		};
	}
	_createAttr(attrNameFirstCh) {
		this.currentAttr = {
			name: attrNameFirstCh,
			value: ""
		};
		this.currentLocation = this.getCurrentLocation(0);
	}
	_leaveAttrName() {
		var _a;
		var _b;
		const token = this.currentToken;
		if (getTokenAttr(token, this.currentAttr.name) === null) {
			token.attrs.push(this.currentAttr);
			if (token.location && this.currentLocation) {
				const attrLocations = (_a = (_b = token.location).attrs) !== null && _a !== void 0 ? _a : _b.attrs = Object.create(null);
				attrLocations[this.currentAttr.name] = this.currentLocation;
				this._leaveAttrValue();
			}
		} else this._err(ERR.duplicateAttribute);
	}
	_leaveAttrValue() {
		if (this.currentLocation) {
			this.currentLocation.endLine = this.preprocessor.line;
			this.currentLocation.endCol = this.preprocessor.col;
			this.currentLocation.endOffset = this.preprocessor.offset;
		}
	}
	prepareToken(ct) {
		this._emitCurrentCharacterToken(ct.location);
		this.currentToken = null;
		if (ct.location) {
			ct.location.endLine = this.preprocessor.line;
			ct.location.endCol = this.preprocessor.col + 1;
			ct.location.endOffset = this.preprocessor.offset + 1;
		}
		this.currentLocation = this.getCurrentLocation(-1);
	}
	emitCurrentTagToken() {
		const ct = this.currentToken;
		this.prepareToken(ct);
		ct.tagID = getTagID(ct.tagName);
		if (ct.type === TokenType.START_TAG) {
			this.lastStartTagName = ct.tagName;
			this.handler.onStartTag(ct);
		} else {
			if (ct.attrs.length > 0) this._err(ERR.endTagWithAttributes);
			if (ct.selfClosing) this._err(ERR.endTagWithTrailingSolidus);
			this.handler.onEndTag(ct);
		}
		this.preprocessor.dropParsedChunk();
	}
	emitCurrentComment(ct) {
		this.prepareToken(ct);
		this.handler.onComment(ct);
		this.preprocessor.dropParsedChunk();
	}
	emitCurrentDoctype(ct) {
		this.prepareToken(ct);
		this.handler.onDoctype(ct);
		this.preprocessor.dropParsedChunk();
	}
	_emitCurrentCharacterToken(nextLocation) {
		if (this.currentCharacterToken) {
			if (nextLocation && this.currentCharacterToken.location) {
				this.currentCharacterToken.location.endLine = nextLocation.startLine;
				this.currentCharacterToken.location.endCol = nextLocation.startCol;
				this.currentCharacterToken.location.endOffset = nextLocation.startOffset;
			}
			switch (this.currentCharacterToken.type) {
				case TokenType.CHARACTER:
					this.handler.onCharacter(this.currentCharacterToken);
					break;
				case TokenType.NULL_CHARACTER:
					this.handler.onNullCharacter(this.currentCharacterToken);
					break;
				case TokenType.WHITESPACE_CHARACTER: this.handler.onWhitespaceCharacter(this.currentCharacterToken);
			}
			this.currentCharacterToken = null;
		}
	}
	_emitEOFToken() {
		const location = this.getCurrentLocation(0);
		if (location) {
			location.endLine = location.startLine;
			location.endCol = location.startCol;
			location.endOffset = location.startOffset;
		}
		this._emitCurrentCharacterToken(location);
		this.handler.onEof({
			type: TokenType.EOF,
			location
		});
		this.active = false;
	}
	_appendCharToCurrentCharacterToken(type, ch) {
		if (this.currentCharacterToken) {
			if (this.currentCharacterToken.type === type) {
				this.currentCharacterToken.chars += ch;
				return;
			} else {
				this.currentLocation = this.getCurrentLocation(0);
				this._emitCurrentCharacterToken(this.currentLocation);
				this.preprocessor.dropParsedChunk();
			}
		}
		this._createCharacterToken(type, ch);
	}
	_emitCodePoint(cp) {
		const type = isWhitespace(cp) ? TokenType.WHITESPACE_CHARACTER : cp === CODE_POINTS.NULL ? TokenType.NULL_CHARACTER : TokenType.CHARACTER;
		this._appendCharToCurrentCharacterToken(type, cp < 65536 ? String.fromCharCode(cp) : String.fromCodePoint(cp));
	}
	_emitChars(ch) {
		this._appendCharToCurrentCharacterToken(TokenType.CHARACTER, ch);
	}
	_startCharacterReference() {
		this.returnState = this.state;
		this.state = State.CHARACTER_REFERENCE;
		this.entityStartPos = this.preprocessor.pos;
		this.entityDecoder.startEntity(this._isCharacterReferenceInAttribute() ? DecodingMode.Attribute : DecodingMode.Legacy);
	}
	_isCharacterReferenceInAttribute() {
		return this.returnState === State.ATTRIBUTE_VALUE_DOUBLE_QUOTED || this.returnState === State.ATTRIBUTE_VALUE_SINGLE_QUOTED || this.returnState === State.ATTRIBUTE_VALUE_UNQUOTED;
	}
	_flushCodePointConsumedAsCharacterReference(cp) {
		if (this._isCharacterReferenceInAttribute()) this.currentAttr.value += String.fromCodePoint(cp);
		else this._emitCodePoint(cp);
	}
	_callState(cp) {
		switch (this.state) {
			case State.DATA:
				this._stateData(cp);
				break;
			case State.RCDATA:
				this._stateRcdata(cp);
				break;
			case State.RAWTEXT:
				this._stateRawtext(cp);
				break;
			case State.SCRIPT_DATA:
				this._stateScriptData(cp);
				break;
			case State.PLAINTEXT:
				this._statePlaintext(cp);
				break;
			case State.TAG_OPEN:
				this._stateTagOpen(cp);
				break;
			case State.END_TAG_OPEN:
				this._stateEndTagOpen(cp);
				break;
			case State.TAG_NAME:
				this._stateTagName(cp);
				break;
			case State.RCDATA_LESS_THAN_SIGN:
				this._stateRcdataLessThanSign(cp);
				break;
			case State.RCDATA_END_TAG_OPEN:
				this._stateRcdataEndTagOpen(cp);
				break;
			case State.RCDATA_END_TAG_NAME:
				this._stateRcdataEndTagName(cp);
				break;
			case State.RAWTEXT_LESS_THAN_SIGN:
				this._stateRawtextLessThanSign(cp);
				break;
			case State.RAWTEXT_END_TAG_OPEN:
				this._stateRawtextEndTagOpen(cp);
				break;
			case State.RAWTEXT_END_TAG_NAME:
				this._stateRawtextEndTagName(cp);
				break;
			case State.SCRIPT_DATA_LESS_THAN_SIGN:
				this._stateScriptDataLessThanSign(cp);
				break;
			case State.SCRIPT_DATA_END_TAG_OPEN:
				this._stateScriptDataEndTagOpen(cp);
				break;
			case State.SCRIPT_DATA_END_TAG_NAME:
				this._stateScriptDataEndTagName(cp);
				break;
			case State.SCRIPT_DATA_ESCAPE_START:
				this._stateScriptDataEscapeStart(cp);
				break;
			case State.SCRIPT_DATA_ESCAPE_START_DASH:
				this._stateScriptDataEscapeStartDash(cp);
				break;
			case State.SCRIPT_DATA_ESCAPED:
				this._stateScriptDataEscaped(cp);
				break;
			case State.SCRIPT_DATA_ESCAPED_DASH:
				this._stateScriptDataEscapedDash(cp);
				break;
			case State.SCRIPT_DATA_ESCAPED_DASH_DASH:
				this._stateScriptDataEscapedDashDash(cp);
				break;
			case State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN:
				this._stateScriptDataEscapedLessThanSign(cp);
				break;
			case State.SCRIPT_DATA_ESCAPED_END_TAG_OPEN:
				this._stateScriptDataEscapedEndTagOpen(cp);
				break;
			case State.SCRIPT_DATA_ESCAPED_END_TAG_NAME:
				this._stateScriptDataEscapedEndTagName(cp);
				break;
			case State.SCRIPT_DATA_DOUBLE_ESCAPE_START:
				this._stateScriptDataDoubleEscapeStart(cp);
				break;
			case State.SCRIPT_DATA_DOUBLE_ESCAPED:
				this._stateScriptDataDoubleEscaped(cp);
				break;
			case State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH:
				this._stateScriptDataDoubleEscapedDash(cp);
				break;
			case State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH:
				this._stateScriptDataDoubleEscapedDashDash(cp);
				break;
			case State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN:
				this._stateScriptDataDoubleEscapedLessThanSign(cp);
				break;
			case State.SCRIPT_DATA_DOUBLE_ESCAPE_END:
				this._stateScriptDataDoubleEscapeEnd(cp);
				break;
			case State.BEFORE_ATTRIBUTE_NAME:
				this._stateBeforeAttributeName(cp);
				break;
			case State.ATTRIBUTE_NAME:
				this._stateAttributeName(cp);
				break;
			case State.AFTER_ATTRIBUTE_NAME:
				this._stateAfterAttributeName(cp);
				break;
			case State.BEFORE_ATTRIBUTE_VALUE:
				this._stateBeforeAttributeValue(cp);
				break;
			case State.ATTRIBUTE_VALUE_DOUBLE_QUOTED:
				this._stateAttributeValueDoubleQuoted(cp);
				break;
			case State.ATTRIBUTE_VALUE_SINGLE_QUOTED:
				this._stateAttributeValueSingleQuoted(cp);
				break;
			case State.ATTRIBUTE_VALUE_UNQUOTED:
				this._stateAttributeValueUnquoted(cp);
				break;
			case State.AFTER_ATTRIBUTE_VALUE_QUOTED:
				this._stateAfterAttributeValueQuoted(cp);
				break;
			case State.SELF_CLOSING_START_TAG:
				this._stateSelfClosingStartTag(cp);
				break;
			case State.BOGUS_COMMENT:
				this._stateBogusComment(cp);
				break;
			case State.MARKUP_DECLARATION_OPEN:
				this._stateMarkupDeclarationOpen(cp);
				break;
			case State.COMMENT_START:
				this._stateCommentStart(cp);
				break;
			case State.COMMENT_START_DASH:
				this._stateCommentStartDash(cp);
				break;
			case State.COMMENT:
				this._stateComment(cp);
				break;
			case State.COMMENT_LESS_THAN_SIGN:
				this._stateCommentLessThanSign(cp);
				break;
			case State.COMMENT_LESS_THAN_SIGN_BANG:
				this._stateCommentLessThanSignBang(cp);
				break;
			case State.COMMENT_LESS_THAN_SIGN_BANG_DASH:
				this._stateCommentLessThanSignBangDash(cp);
				break;
			case State.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH:
				this._stateCommentLessThanSignBangDashDash(cp);
				break;
			case State.COMMENT_END_DASH:
				this._stateCommentEndDash(cp);
				break;
			case State.COMMENT_END:
				this._stateCommentEnd(cp);
				break;
			case State.COMMENT_END_BANG:
				this._stateCommentEndBang(cp);
				break;
			case State.DOCTYPE:
				this._stateDoctype(cp);
				break;
			case State.BEFORE_DOCTYPE_NAME:
				this._stateBeforeDoctypeName(cp);
				break;
			case State.DOCTYPE_NAME:
				this._stateDoctypeName(cp);
				break;
			case State.AFTER_DOCTYPE_NAME:
				this._stateAfterDoctypeName(cp);
				break;
			case State.AFTER_DOCTYPE_PUBLIC_KEYWORD:
				this._stateAfterDoctypePublicKeyword(cp);
				break;
			case State.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER:
				this._stateBeforeDoctypePublicIdentifier(cp);
				break;
			case State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED:
				this._stateDoctypePublicIdentifierDoubleQuoted(cp);
				break;
			case State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED:
				this._stateDoctypePublicIdentifierSingleQuoted(cp);
				break;
			case State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER:
				this._stateAfterDoctypePublicIdentifier(cp);
				break;
			case State.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS:
				this._stateBetweenDoctypePublicAndSystemIdentifiers(cp);
				break;
			case State.AFTER_DOCTYPE_SYSTEM_KEYWORD:
				this._stateAfterDoctypeSystemKeyword(cp);
				break;
			case State.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER:
				this._stateBeforeDoctypeSystemIdentifier(cp);
				break;
			case State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED:
				this._stateDoctypeSystemIdentifierDoubleQuoted(cp);
				break;
			case State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED:
				this._stateDoctypeSystemIdentifierSingleQuoted(cp);
				break;
			case State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER:
				this._stateAfterDoctypeSystemIdentifier(cp);
				break;
			case State.BOGUS_DOCTYPE:
				this._stateBogusDoctype(cp);
				break;
			case State.CDATA_SECTION:
				this._stateCdataSection(cp);
				break;
			case State.CDATA_SECTION_BRACKET:
				this._stateCdataSectionBracket(cp);
				break;
			case State.CDATA_SECTION_END:
				this._stateCdataSectionEnd(cp);
				break;
			case State.CHARACTER_REFERENCE:
				this._stateCharacterReference();
				break;
			case State.AMBIGUOUS_AMPERSAND:
				this._stateAmbiguousAmpersand(cp);
				break;
			default: throw new Error("Unknown state");
		}
	}
	_stateData(cp) {
		switch (cp) {
			case CODE_POINTS.LESS_THAN_SIGN:
				this.state = State.TAG_OPEN;
				break;
			case CODE_POINTS.AMPERSAND:
				this._startCharacterReference();
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this._emitCodePoint(cp);
				break;
			case CODE_POINTS.EOF:
				this._emitEOFToken();
				break;
			default: this._emitCodePoint(cp);
		}
	}
	_stateRcdata(cp) {
		switch (cp) {
			case CODE_POINTS.AMPERSAND:
				this._startCharacterReference();
				break;
			case CODE_POINTS.LESS_THAN_SIGN:
				this.state = State.RCDATA_LESS_THAN_SIGN;
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this._emitChars("�");
				break;
			case CODE_POINTS.EOF:
				this._emitEOFToken();
				break;
			default: this._emitCodePoint(cp);
		}
	}
	_stateRawtext(cp) {
		switch (cp) {
			case CODE_POINTS.LESS_THAN_SIGN:
				this.state = State.RAWTEXT_LESS_THAN_SIGN;
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this._emitChars("�");
				break;
			case CODE_POINTS.EOF:
				this._emitEOFToken();
				break;
			default: this._emitCodePoint(cp);
		}
	}
	_stateScriptData(cp) {
		switch (cp) {
			case CODE_POINTS.LESS_THAN_SIGN:
				this.state = State.SCRIPT_DATA_LESS_THAN_SIGN;
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this._emitChars("�");
				break;
			case CODE_POINTS.EOF:
				this._emitEOFToken();
				break;
			default: this._emitCodePoint(cp);
		}
	}
	_statePlaintext(cp) {
		switch (cp) {
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this._emitChars("�");
				break;
			case CODE_POINTS.EOF:
				this._emitEOFToken();
				break;
			default: this._emitCodePoint(cp);
		}
	}
	_stateTagOpen(cp) {
		if (isAsciiLetter(cp)) {
			this._createStartTagToken();
			this.state = State.TAG_NAME;
			this._stateTagName(cp);
		} else switch (cp) {
			case CODE_POINTS.EXCLAMATION_MARK:
				this.state = State.MARKUP_DECLARATION_OPEN;
				break;
			case CODE_POINTS.SOLIDUS:
				this.state = State.END_TAG_OPEN;
				break;
			case CODE_POINTS.QUESTION_MARK:
				this._err(ERR.unexpectedQuestionMarkInsteadOfTagName);
				this._createCommentToken(1);
				this.state = State.BOGUS_COMMENT;
				this._stateBogusComment(cp);
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofBeforeTagName);
				this._emitChars("<");
				this._emitEOFToken();
				break;
			default:
				this._err(ERR.invalidFirstCharacterOfTagName);
				this._emitChars("<");
				this.state = State.DATA;
				this._stateData(cp);
		}
	}
	_stateEndTagOpen(cp) {
		if (isAsciiLetter(cp)) {
			this._createEndTagToken();
			this.state = State.TAG_NAME;
			this._stateTagName(cp);
		} else switch (cp) {
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._err(ERR.missingEndTagName);
				this.state = State.DATA;
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofBeforeTagName);
				this._emitChars("</");
				this._emitEOFToken();
				break;
			default:
				this._err(ERR.invalidFirstCharacterOfTagName);
				this._createCommentToken(2);
				this.state = State.BOGUS_COMMENT;
				this._stateBogusComment(cp);
		}
	}
	_stateTagName(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED:
				this.state = State.BEFORE_ATTRIBUTE_NAME;
				break;
			case CODE_POINTS.SOLIDUS:
				this.state = State.SELF_CLOSING_START_TAG;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.state = State.DATA;
				this.emitCurrentTagToken();
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				token.tagName += "�";
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInTag);
				this._emitEOFToken();
				break;
			default: token.tagName += String.fromCodePoint(isAsciiUpper(cp) ? toAsciiLower(cp) : cp);
		}
	}
	_stateRcdataLessThanSign(cp) {
		if (cp === CODE_POINTS.SOLIDUS) this.state = State.RCDATA_END_TAG_OPEN;
		else {
			this._emitChars("<");
			this.state = State.RCDATA;
			this._stateRcdata(cp);
		}
	}
	_stateRcdataEndTagOpen(cp) {
		if (isAsciiLetter(cp)) {
			this.state = State.RCDATA_END_TAG_NAME;
			this._stateRcdataEndTagName(cp);
		} else {
			this._emitChars("</");
			this.state = State.RCDATA;
			this._stateRcdata(cp);
		}
	}
	handleSpecialEndTag(_cp) {
		if (!this.preprocessor.startsWith(this.lastStartTagName, false)) return !this._ensureHibernation();
		this._createEndTagToken();
		const token = this.currentToken;
		token.tagName = this.lastStartTagName;
		switch (this.preprocessor.peek(this.lastStartTagName.length)) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED:
				this._advanceBy(this.lastStartTagName.length);
				this.state = State.BEFORE_ATTRIBUTE_NAME;
				return false;
			case CODE_POINTS.SOLIDUS:
				this._advanceBy(this.lastStartTagName.length);
				this.state = State.SELF_CLOSING_START_TAG;
				return false;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._advanceBy(this.lastStartTagName.length);
				this.emitCurrentTagToken();
				this.state = State.DATA;
				return false;
			default: return !this._ensureHibernation();
		}
	}
	_stateRcdataEndTagName(cp) {
		if (this.handleSpecialEndTag(cp)) {
			this._emitChars("</");
			this.state = State.RCDATA;
			this._stateRcdata(cp);
		}
	}
	_stateRawtextLessThanSign(cp) {
		if (cp === CODE_POINTS.SOLIDUS) this.state = State.RAWTEXT_END_TAG_OPEN;
		else {
			this._emitChars("<");
			this.state = State.RAWTEXT;
			this._stateRawtext(cp);
		}
	}
	_stateRawtextEndTagOpen(cp) {
		if (isAsciiLetter(cp)) {
			this.state = State.RAWTEXT_END_TAG_NAME;
			this._stateRawtextEndTagName(cp);
		} else {
			this._emitChars("</");
			this.state = State.RAWTEXT;
			this._stateRawtext(cp);
		}
	}
	_stateRawtextEndTagName(cp) {
		if (this.handleSpecialEndTag(cp)) {
			this._emitChars("</");
			this.state = State.RAWTEXT;
			this._stateRawtext(cp);
		}
	}
	_stateScriptDataLessThanSign(cp) {
		switch (cp) {
			case CODE_POINTS.SOLIDUS:
				this.state = State.SCRIPT_DATA_END_TAG_OPEN;
				break;
			case CODE_POINTS.EXCLAMATION_MARK:
				this.state = State.SCRIPT_DATA_ESCAPE_START;
				this._emitChars("<!");
				break;
			default:
				this._emitChars("<");
				this.state = State.SCRIPT_DATA;
				this._stateScriptData(cp);
		}
	}
	_stateScriptDataEndTagOpen(cp) {
		if (isAsciiLetter(cp)) {
			this.state = State.SCRIPT_DATA_END_TAG_NAME;
			this._stateScriptDataEndTagName(cp);
		} else {
			this._emitChars("</");
			this.state = State.SCRIPT_DATA;
			this._stateScriptData(cp);
		}
	}
	_stateScriptDataEndTagName(cp) {
		if (this.handleSpecialEndTag(cp)) {
			this._emitChars("</");
			this.state = State.SCRIPT_DATA;
			this._stateScriptData(cp);
		}
	}
	_stateScriptDataEscapeStart(cp) {
		if (cp === CODE_POINTS.HYPHEN_MINUS) {
			this.state = State.SCRIPT_DATA_ESCAPE_START_DASH;
			this._emitChars("-");
		} else {
			this.state = State.SCRIPT_DATA;
			this._stateScriptData(cp);
		}
	}
	_stateScriptDataEscapeStartDash(cp) {
		if (cp === CODE_POINTS.HYPHEN_MINUS) {
			this.state = State.SCRIPT_DATA_ESCAPED_DASH_DASH;
			this._emitChars("-");
		} else {
			this.state = State.SCRIPT_DATA;
			this._stateScriptData(cp);
		}
	}
	_stateScriptDataEscaped(cp) {
		switch (cp) {
			case CODE_POINTS.HYPHEN_MINUS:
				this.state = State.SCRIPT_DATA_ESCAPED_DASH;
				this._emitChars("-");
				break;
			case CODE_POINTS.LESS_THAN_SIGN:
				this.state = State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this._emitChars("�");
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInScriptHtmlCommentLikeText);
				this._emitEOFToken();
				break;
			default: this._emitCodePoint(cp);
		}
	}
	_stateScriptDataEscapedDash(cp) {
		switch (cp) {
			case CODE_POINTS.HYPHEN_MINUS:
				this.state = State.SCRIPT_DATA_ESCAPED_DASH_DASH;
				this._emitChars("-");
				break;
			case CODE_POINTS.LESS_THAN_SIGN:
				this.state = State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this.state = State.SCRIPT_DATA_ESCAPED;
				this._emitChars("�");
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInScriptHtmlCommentLikeText);
				this._emitEOFToken();
				break;
			default:
				this.state = State.SCRIPT_DATA_ESCAPED;
				this._emitCodePoint(cp);
		}
	}
	_stateScriptDataEscapedDashDash(cp) {
		switch (cp) {
			case CODE_POINTS.HYPHEN_MINUS:
				this._emitChars("-");
				break;
			case CODE_POINTS.LESS_THAN_SIGN:
				this.state = State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.state = State.SCRIPT_DATA;
				this._emitChars(">");
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this.state = State.SCRIPT_DATA_ESCAPED;
				this._emitChars("�");
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInScriptHtmlCommentLikeText);
				this._emitEOFToken();
				break;
			default:
				this.state = State.SCRIPT_DATA_ESCAPED;
				this._emitCodePoint(cp);
		}
	}
	_stateScriptDataEscapedLessThanSign(cp) {
		if (cp === CODE_POINTS.SOLIDUS) this.state = State.SCRIPT_DATA_ESCAPED_END_TAG_OPEN;
		else if (isAsciiLetter(cp)) {
			this._emitChars("<");
			this.state = State.SCRIPT_DATA_DOUBLE_ESCAPE_START;
			this._stateScriptDataDoubleEscapeStart(cp);
		} else {
			this._emitChars("<");
			this.state = State.SCRIPT_DATA_ESCAPED;
			this._stateScriptDataEscaped(cp);
		}
	}
	_stateScriptDataEscapedEndTagOpen(cp) {
		if (isAsciiLetter(cp)) {
			this.state = State.SCRIPT_DATA_ESCAPED_END_TAG_NAME;
			this._stateScriptDataEscapedEndTagName(cp);
		} else {
			this._emitChars("</");
			this.state = State.SCRIPT_DATA_ESCAPED;
			this._stateScriptDataEscaped(cp);
		}
	}
	_stateScriptDataEscapedEndTagName(cp) {
		if (this.handleSpecialEndTag(cp)) {
			this._emitChars("</");
			this.state = State.SCRIPT_DATA_ESCAPED;
			this._stateScriptDataEscaped(cp);
		}
	}
	_stateScriptDataDoubleEscapeStart(cp) {
		if (this.preprocessor.startsWith(SEQUENCES.SCRIPT, false) && isScriptDataDoubleEscapeSequenceEnd(this.preprocessor.peek(SEQUENCES.SCRIPT.length))) {
			this._emitCodePoint(cp);
			for (let i = 0; i < SEQUENCES.SCRIPT.length; i++) this._emitCodePoint(this._consume());
			this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
		} else if (!this._ensureHibernation()) {
			this.state = State.SCRIPT_DATA_ESCAPED;
			this._stateScriptDataEscaped(cp);
		}
	}
	_stateScriptDataDoubleEscaped(cp) {
		switch (cp) {
			case CODE_POINTS.HYPHEN_MINUS:
				this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH;
				this._emitChars("-");
				break;
			case CODE_POINTS.LESS_THAN_SIGN:
				this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN;
				this._emitChars("<");
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this._emitChars("�");
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInScriptHtmlCommentLikeText);
				this._emitEOFToken();
				break;
			default: this._emitCodePoint(cp);
		}
	}
	_stateScriptDataDoubleEscapedDash(cp) {
		switch (cp) {
			case CODE_POINTS.HYPHEN_MINUS:
				this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH;
				this._emitChars("-");
				break;
			case CODE_POINTS.LESS_THAN_SIGN:
				this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN;
				this._emitChars("<");
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
				this._emitChars("�");
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInScriptHtmlCommentLikeText);
				this._emitEOFToken();
				break;
			default:
				this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
				this._emitCodePoint(cp);
		}
	}
	_stateScriptDataDoubleEscapedDashDash(cp) {
		switch (cp) {
			case CODE_POINTS.HYPHEN_MINUS:
				this._emitChars("-");
				break;
			case CODE_POINTS.LESS_THAN_SIGN:
				this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN;
				this._emitChars("<");
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.state = State.SCRIPT_DATA;
				this._emitChars(">");
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
				this._emitChars("�");
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInScriptHtmlCommentLikeText);
				this._emitEOFToken();
				break;
			default:
				this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
				this._emitCodePoint(cp);
		}
	}
	_stateScriptDataDoubleEscapedLessThanSign(cp) {
		if (cp === CODE_POINTS.SOLIDUS) {
			this.state = State.SCRIPT_DATA_DOUBLE_ESCAPE_END;
			this._emitChars("/");
		} else {
			this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
			this._stateScriptDataDoubleEscaped(cp);
		}
	}
	_stateScriptDataDoubleEscapeEnd(cp) {
		if (this.preprocessor.startsWith(SEQUENCES.SCRIPT, false) && isScriptDataDoubleEscapeSequenceEnd(this.preprocessor.peek(SEQUENCES.SCRIPT.length))) {
			this._emitCodePoint(cp);
			for (let i = 0; i < SEQUENCES.SCRIPT.length; i++) this._emitCodePoint(this._consume());
			this.state = State.SCRIPT_DATA_ESCAPED;
		} else if (!this._ensureHibernation()) {
			this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
			this._stateScriptDataDoubleEscaped(cp);
		}
	}
	_stateBeforeAttributeName(cp) {
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED: break;
			case CODE_POINTS.SOLIDUS:
			case CODE_POINTS.GREATER_THAN_SIGN:
			case CODE_POINTS.EOF:
				this.state = State.AFTER_ATTRIBUTE_NAME;
				this._stateAfterAttributeName(cp);
				break;
			case CODE_POINTS.EQUALS_SIGN:
				this._err(ERR.unexpectedEqualsSignBeforeAttributeName);
				this._createAttr("=");
				this.state = State.ATTRIBUTE_NAME;
				break;
			default:
				this._createAttr("");
				this.state = State.ATTRIBUTE_NAME;
				this._stateAttributeName(cp);
		}
	}
	_stateAttributeName(cp) {
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED:
			case CODE_POINTS.SOLIDUS:
			case CODE_POINTS.GREATER_THAN_SIGN:
			case CODE_POINTS.EOF:
				this._leaveAttrName();
				this.state = State.AFTER_ATTRIBUTE_NAME;
				this._stateAfterAttributeName(cp);
				break;
			case CODE_POINTS.EQUALS_SIGN:
				this._leaveAttrName();
				this.state = State.BEFORE_ATTRIBUTE_VALUE;
				break;
			case CODE_POINTS.QUOTATION_MARK:
			case CODE_POINTS.APOSTROPHE:
			case CODE_POINTS.LESS_THAN_SIGN:
				this._err(ERR.unexpectedCharacterInAttributeName);
				this.currentAttr.name += String.fromCodePoint(cp);
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this.currentAttr.name += "�";
				break;
			default: this.currentAttr.name += String.fromCodePoint(isAsciiUpper(cp) ? toAsciiLower(cp) : cp);
		}
	}
	_stateAfterAttributeName(cp) {
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED: break;
			case CODE_POINTS.SOLIDUS:
				this.state = State.SELF_CLOSING_START_TAG;
				break;
			case CODE_POINTS.EQUALS_SIGN:
				this.state = State.BEFORE_ATTRIBUTE_VALUE;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.state = State.DATA;
				this.emitCurrentTagToken();
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInTag);
				this._emitEOFToken();
				break;
			default:
				this._createAttr("");
				this.state = State.ATTRIBUTE_NAME;
				this._stateAttributeName(cp);
		}
	}
	_stateBeforeAttributeValue(cp) {
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED: break;
			case CODE_POINTS.QUOTATION_MARK:
				this.state = State.ATTRIBUTE_VALUE_DOUBLE_QUOTED;
				break;
			case CODE_POINTS.APOSTROPHE:
				this.state = State.ATTRIBUTE_VALUE_SINGLE_QUOTED;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._err(ERR.missingAttributeValue);
				this.state = State.DATA;
				this.emitCurrentTagToken();
				break;
			default:
				this.state = State.ATTRIBUTE_VALUE_UNQUOTED;
				this._stateAttributeValueUnquoted(cp);
		}
	}
	_stateAttributeValueDoubleQuoted(cp) {
		switch (cp) {
			case CODE_POINTS.QUOTATION_MARK:
				this.state = State.AFTER_ATTRIBUTE_VALUE_QUOTED;
				break;
			case CODE_POINTS.AMPERSAND:
				this._startCharacterReference();
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this.currentAttr.value += "�";
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInTag);
				this._emitEOFToken();
				break;
			default: this.currentAttr.value += String.fromCodePoint(cp);
		}
	}
	_stateAttributeValueSingleQuoted(cp) {
		switch (cp) {
			case CODE_POINTS.APOSTROPHE:
				this.state = State.AFTER_ATTRIBUTE_VALUE_QUOTED;
				break;
			case CODE_POINTS.AMPERSAND:
				this._startCharacterReference();
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this.currentAttr.value += "�";
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInTag);
				this._emitEOFToken();
				break;
			default: this.currentAttr.value += String.fromCodePoint(cp);
		}
	}
	_stateAttributeValueUnquoted(cp) {
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED:
				this._leaveAttrValue();
				this.state = State.BEFORE_ATTRIBUTE_NAME;
				break;
			case CODE_POINTS.AMPERSAND:
				this._startCharacterReference();
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._leaveAttrValue();
				this.state = State.DATA;
				this.emitCurrentTagToken();
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this.currentAttr.value += "�";
				break;
			case CODE_POINTS.QUOTATION_MARK:
			case CODE_POINTS.APOSTROPHE:
			case CODE_POINTS.LESS_THAN_SIGN:
			case CODE_POINTS.EQUALS_SIGN:
			case CODE_POINTS.GRAVE_ACCENT:
				this._err(ERR.unexpectedCharacterInUnquotedAttributeValue);
				this.currentAttr.value += String.fromCodePoint(cp);
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInTag);
				this._emitEOFToken();
				break;
			default: this.currentAttr.value += String.fromCodePoint(cp);
		}
	}
	_stateAfterAttributeValueQuoted(cp) {
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED:
				this._leaveAttrValue();
				this.state = State.BEFORE_ATTRIBUTE_NAME;
				break;
			case CODE_POINTS.SOLIDUS:
				this._leaveAttrValue();
				this.state = State.SELF_CLOSING_START_TAG;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._leaveAttrValue();
				this.state = State.DATA;
				this.emitCurrentTagToken();
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInTag);
				this._emitEOFToken();
				break;
			default:
				this._err(ERR.missingWhitespaceBetweenAttributes);
				this.state = State.BEFORE_ATTRIBUTE_NAME;
				this._stateBeforeAttributeName(cp);
		}
	}
	_stateSelfClosingStartTag(cp) {
		switch (cp) {
			case CODE_POINTS.GREATER_THAN_SIGN: {
				const token = this.currentToken;
				token.selfClosing = true;
				this.state = State.DATA;
				this.emitCurrentTagToken();
				break;
			}
			case CODE_POINTS.EOF:
				this._err(ERR.eofInTag);
				this._emitEOFToken();
				break;
			default:
				this._err(ERR.unexpectedSolidusInTag);
				this.state = State.BEFORE_ATTRIBUTE_NAME;
				this._stateBeforeAttributeName(cp);
		}
	}
	_stateBogusComment(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.state = State.DATA;
				this.emitCurrentComment(token);
				break;
			case CODE_POINTS.EOF:
				this.emitCurrentComment(token);
				this._emitEOFToken();
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				token.data += "�";
				break;
			default: token.data += String.fromCodePoint(cp);
		}
	}
	_stateMarkupDeclarationOpen(cp) {
		if (this._consumeSequenceIfMatch(SEQUENCES.DASH_DASH, true)) {
			this._createCommentToken(SEQUENCES.DASH_DASH.length + 1);
			this.state = State.COMMENT_START;
		} else if (this._consumeSequenceIfMatch(SEQUENCES.DOCTYPE, false)) {
			this.currentLocation = this.getCurrentLocation(SEQUENCES.DOCTYPE.length + 1);
			this.state = State.DOCTYPE;
		} else if (this._consumeSequenceIfMatch(SEQUENCES.CDATA_START, true)) {
			if (this.inForeignNode) this.state = State.CDATA_SECTION;
			else {
				this._err(ERR.cdataInHtmlContent);
				this._createCommentToken(SEQUENCES.CDATA_START.length + 1);
				this.currentToken.data = "[CDATA[";
				this.state = State.BOGUS_COMMENT;
			}
		} else if (!this._ensureHibernation()) {
			this._err(ERR.incorrectlyOpenedComment);
			this._createCommentToken(2);
			this.state = State.BOGUS_COMMENT;
			this._stateBogusComment(cp);
		}
	}
	_stateCommentStart(cp) {
		switch (cp) {
			case CODE_POINTS.HYPHEN_MINUS:
				this.state = State.COMMENT_START_DASH;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN: {
				this._err(ERR.abruptClosingOfEmptyComment);
				this.state = State.DATA;
				const token = this.currentToken;
				this.emitCurrentComment(token);
				break;
			}
			default:
				this.state = State.COMMENT;
				this._stateComment(cp);
		}
	}
	_stateCommentStartDash(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.HYPHEN_MINUS:
				this.state = State.COMMENT_END;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._err(ERR.abruptClosingOfEmptyComment);
				this.state = State.DATA;
				this.emitCurrentComment(token);
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInComment);
				this.emitCurrentComment(token);
				this._emitEOFToken();
				break;
			default:
				token.data += "-";
				this.state = State.COMMENT;
				this._stateComment(cp);
		}
	}
	_stateComment(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.HYPHEN_MINUS:
				this.state = State.COMMENT_END_DASH;
				break;
			case CODE_POINTS.LESS_THAN_SIGN:
				token.data += "<";
				this.state = State.COMMENT_LESS_THAN_SIGN;
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				token.data += "�";
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInComment);
				this.emitCurrentComment(token);
				this._emitEOFToken();
				break;
			default: token.data += String.fromCodePoint(cp);
		}
	}
	_stateCommentLessThanSign(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.EXCLAMATION_MARK:
				token.data += "!";
				this.state = State.COMMENT_LESS_THAN_SIGN_BANG;
				break;
			case CODE_POINTS.LESS_THAN_SIGN:
				token.data += "<";
				break;
			default:
				this.state = State.COMMENT;
				this._stateComment(cp);
		}
	}
	_stateCommentLessThanSignBang(cp) {
		if (cp === CODE_POINTS.HYPHEN_MINUS) this.state = State.COMMENT_LESS_THAN_SIGN_BANG_DASH;
		else {
			this.state = State.COMMENT;
			this._stateComment(cp);
		}
	}
	_stateCommentLessThanSignBangDash(cp) {
		if (cp === CODE_POINTS.HYPHEN_MINUS) this.state = State.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH;
		else {
			this.state = State.COMMENT_END_DASH;
			this._stateCommentEndDash(cp);
		}
	}
	_stateCommentLessThanSignBangDashDash(cp) {
		if (cp !== CODE_POINTS.GREATER_THAN_SIGN && cp !== CODE_POINTS.EOF) this._err(ERR.nestedComment);
		this.state = State.COMMENT_END;
		this._stateCommentEnd(cp);
	}
	_stateCommentEndDash(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.HYPHEN_MINUS:
				this.state = State.COMMENT_END;
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInComment);
				this.emitCurrentComment(token);
				this._emitEOFToken();
				break;
			default:
				token.data += "-";
				this.state = State.COMMENT;
				this._stateComment(cp);
		}
	}
	_stateCommentEnd(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.state = State.DATA;
				this.emitCurrentComment(token);
				break;
			case CODE_POINTS.EXCLAMATION_MARK:
				this.state = State.COMMENT_END_BANG;
				break;
			case CODE_POINTS.HYPHEN_MINUS:
				token.data += "-";
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInComment);
				this.emitCurrentComment(token);
				this._emitEOFToken();
				break;
			default:
				token.data += "--";
				this.state = State.COMMENT;
				this._stateComment(cp);
		}
	}
	_stateCommentEndBang(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.HYPHEN_MINUS:
				token.data += "--!";
				this.state = State.COMMENT_END_DASH;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._err(ERR.incorrectlyClosedComment);
				this.state = State.DATA;
				this.emitCurrentComment(token);
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInComment);
				this.emitCurrentComment(token);
				this._emitEOFToken();
				break;
			default:
				token.data += "--!";
				this.state = State.COMMENT;
				this._stateComment(cp);
		}
	}
	_stateDoctype(cp) {
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED:
				this.state = State.BEFORE_DOCTYPE_NAME;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.state = State.BEFORE_DOCTYPE_NAME;
				this._stateBeforeDoctypeName(cp);
				break;
			case CODE_POINTS.EOF: {
				this._err(ERR.eofInDoctype);
				this._createDoctypeToken(null);
				const token = this.currentToken;
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			}
			default:
				this._err(ERR.missingWhitespaceBeforeDoctypeName);
				this.state = State.BEFORE_DOCTYPE_NAME;
				this._stateBeforeDoctypeName(cp);
		}
	}
	_stateBeforeDoctypeName(cp) {
		if (isAsciiUpper(cp)) {
			this._createDoctypeToken(String.fromCharCode(toAsciiLower(cp)));
			this.state = State.DOCTYPE_NAME;
		} else switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED: break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				this._createDoctypeToken("�");
				this.state = State.DOCTYPE_NAME;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN: {
				this._err(ERR.missingDoctypeName);
				this._createDoctypeToken(null);
				const token = this.currentToken;
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this.state = State.DATA;
				break;
			}
			case CODE_POINTS.EOF: {
				this._err(ERR.eofInDoctype);
				this._createDoctypeToken(null);
				const token = this.currentToken;
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			}
			default:
				this._createDoctypeToken(String.fromCodePoint(cp));
				this.state = State.DOCTYPE_NAME;
		}
	}
	_stateDoctypeName(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED:
				this.state = State.AFTER_DOCTYPE_NAME;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.state = State.DATA;
				this.emitCurrentDoctype(token);
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				token.name += "�";
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInDoctype);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			default: token.name += String.fromCodePoint(isAsciiUpper(cp) ? toAsciiLower(cp) : cp);
		}
	}
	_stateAfterDoctypeName(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED: break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.state = State.DATA;
				this.emitCurrentDoctype(token);
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInDoctype);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			default: if (this._consumeSequenceIfMatch(SEQUENCES.PUBLIC, false)) this.state = State.AFTER_DOCTYPE_PUBLIC_KEYWORD;
			else if (this._consumeSequenceIfMatch(SEQUENCES.SYSTEM, false)) this.state = State.AFTER_DOCTYPE_SYSTEM_KEYWORD;
			else if (!this._ensureHibernation()) {
				this._err(ERR.invalidCharacterSequenceAfterDoctypeName);
				token.forceQuirks = true;
				this.state = State.BOGUS_DOCTYPE;
				this._stateBogusDoctype(cp);
			}
		}
	}
	_stateAfterDoctypePublicKeyword(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED:
				this.state = State.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER;
				break;
			case CODE_POINTS.QUOTATION_MARK:
				this._err(ERR.missingWhitespaceAfterDoctypePublicKeyword);
				token.publicId = "";
				this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
				break;
			case CODE_POINTS.APOSTROPHE:
				this._err(ERR.missingWhitespaceAfterDoctypePublicKeyword);
				token.publicId = "";
				this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._err(ERR.missingDoctypePublicIdentifier);
				token.forceQuirks = true;
				this.state = State.DATA;
				this.emitCurrentDoctype(token);
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInDoctype);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			default:
				this._err(ERR.missingQuoteBeforeDoctypePublicIdentifier);
				token.forceQuirks = true;
				this.state = State.BOGUS_DOCTYPE;
				this._stateBogusDoctype(cp);
		}
	}
	_stateBeforeDoctypePublicIdentifier(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED: break;
			case CODE_POINTS.QUOTATION_MARK:
				token.publicId = "";
				this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
				break;
			case CODE_POINTS.APOSTROPHE:
				token.publicId = "";
				this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._err(ERR.missingDoctypePublicIdentifier);
				token.forceQuirks = true;
				this.state = State.DATA;
				this.emitCurrentDoctype(token);
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInDoctype);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			default:
				this._err(ERR.missingQuoteBeforeDoctypePublicIdentifier);
				token.forceQuirks = true;
				this.state = State.BOGUS_DOCTYPE;
				this._stateBogusDoctype(cp);
		}
	}
	_stateDoctypePublicIdentifierDoubleQuoted(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.QUOTATION_MARK:
				this.state = State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				token.publicId += "�";
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._err(ERR.abruptDoctypePublicIdentifier);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this.state = State.DATA;
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInDoctype);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			default: token.publicId += String.fromCodePoint(cp);
		}
	}
	_stateDoctypePublicIdentifierSingleQuoted(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.APOSTROPHE:
				this.state = State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				token.publicId += "�";
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._err(ERR.abruptDoctypePublicIdentifier);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this.state = State.DATA;
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInDoctype);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			default: token.publicId += String.fromCodePoint(cp);
		}
	}
	_stateAfterDoctypePublicIdentifier(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED:
				this.state = State.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.state = State.DATA;
				this.emitCurrentDoctype(token);
				break;
			case CODE_POINTS.QUOTATION_MARK:
				this._err(ERR.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers);
				token.systemId = "";
				this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
				break;
			case CODE_POINTS.APOSTROPHE:
				this._err(ERR.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers);
				token.systemId = "";
				this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInDoctype);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			default:
				this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
				token.forceQuirks = true;
				this.state = State.BOGUS_DOCTYPE;
				this._stateBogusDoctype(cp);
		}
	}
	_stateBetweenDoctypePublicAndSystemIdentifiers(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED: break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.emitCurrentDoctype(token);
				this.state = State.DATA;
				break;
			case CODE_POINTS.QUOTATION_MARK:
				token.systemId = "";
				this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
				break;
			case CODE_POINTS.APOSTROPHE:
				token.systemId = "";
				this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInDoctype);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			default:
				this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
				token.forceQuirks = true;
				this.state = State.BOGUS_DOCTYPE;
				this._stateBogusDoctype(cp);
		}
	}
	_stateAfterDoctypeSystemKeyword(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED:
				this.state = State.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER;
				break;
			case CODE_POINTS.QUOTATION_MARK:
				this._err(ERR.missingWhitespaceAfterDoctypeSystemKeyword);
				token.systemId = "";
				this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
				break;
			case CODE_POINTS.APOSTROPHE:
				this._err(ERR.missingWhitespaceAfterDoctypeSystemKeyword);
				token.systemId = "";
				this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._err(ERR.missingDoctypeSystemIdentifier);
				token.forceQuirks = true;
				this.state = State.DATA;
				this.emitCurrentDoctype(token);
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInDoctype);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			default:
				this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
				token.forceQuirks = true;
				this.state = State.BOGUS_DOCTYPE;
				this._stateBogusDoctype(cp);
		}
	}
	_stateBeforeDoctypeSystemIdentifier(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED: break;
			case CODE_POINTS.QUOTATION_MARK:
				token.systemId = "";
				this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
				break;
			case CODE_POINTS.APOSTROPHE:
				token.systemId = "";
				this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._err(ERR.missingDoctypeSystemIdentifier);
				token.forceQuirks = true;
				this.state = State.DATA;
				this.emitCurrentDoctype(token);
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInDoctype);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			default:
				this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
				token.forceQuirks = true;
				this.state = State.BOGUS_DOCTYPE;
				this._stateBogusDoctype(cp);
		}
	}
	_stateDoctypeSystemIdentifierDoubleQuoted(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.QUOTATION_MARK:
				this.state = State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				token.systemId += "�";
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._err(ERR.abruptDoctypeSystemIdentifier);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this.state = State.DATA;
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInDoctype);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			default: token.systemId += String.fromCodePoint(cp);
		}
	}
	_stateDoctypeSystemIdentifierSingleQuoted(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.APOSTROPHE:
				this.state = State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				token.systemId += "�";
				break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this._err(ERR.abruptDoctypeSystemIdentifier);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this.state = State.DATA;
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInDoctype);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			default: token.systemId += String.fromCodePoint(cp);
		}
	}
	_stateAfterDoctypeSystemIdentifier(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.SPACE:
			case CODE_POINTS.LINE_FEED:
			case CODE_POINTS.TABULATION:
			case CODE_POINTS.FORM_FEED: break;
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.emitCurrentDoctype(token);
				this.state = State.DATA;
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInDoctype);
				token.forceQuirks = true;
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
				break;
			default:
				this._err(ERR.unexpectedCharacterAfterDoctypeSystemIdentifier);
				this.state = State.BOGUS_DOCTYPE;
				this._stateBogusDoctype(cp);
		}
	}
	_stateBogusDoctype(cp) {
		const token = this.currentToken;
		switch (cp) {
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.emitCurrentDoctype(token);
				this.state = State.DATA;
				break;
			case CODE_POINTS.NULL:
				this._err(ERR.unexpectedNullCharacter);
				break;
			case CODE_POINTS.EOF:
				this.emitCurrentDoctype(token);
				this._emitEOFToken();
		}
	}
	_stateCdataSection(cp) {
		switch (cp) {
			case CODE_POINTS.RIGHT_SQUARE_BRACKET:
				this.state = State.CDATA_SECTION_BRACKET;
				break;
			case CODE_POINTS.EOF:
				this._err(ERR.eofInCdata);
				this._emitEOFToken();
				break;
			default: this._emitCodePoint(cp);
		}
	}
	_stateCdataSectionBracket(cp) {
		if (cp === CODE_POINTS.RIGHT_SQUARE_BRACKET) this.state = State.CDATA_SECTION_END;
		else {
			this._emitChars("]");
			this.state = State.CDATA_SECTION;
			this._stateCdataSection(cp);
		}
	}
	_stateCdataSectionEnd(cp) {
		switch (cp) {
			case CODE_POINTS.GREATER_THAN_SIGN:
				this.state = State.DATA;
				break;
			case CODE_POINTS.RIGHT_SQUARE_BRACKET:
				this._emitChars("]");
				break;
			default:
				this._emitChars("]]");
				this.state = State.CDATA_SECTION;
				this._stateCdataSection(cp);
		}
	}
	_stateCharacterReference() {
		let length = this.entityDecoder.write(this.preprocessor.html, this.preprocessor.pos);
		if (length < 0) {
			if (this.preprocessor.lastChunkWritten) length = this.entityDecoder.end();
			else {
				this.active = false;
				this.preprocessor.pos = this.preprocessor.html.length - 1;
				this.consumedAfterSnapshot = 0;
				this.preprocessor.endOfChunkHit = true;
				return;
			}
		}
		if (length === 0) {
			this.preprocessor.pos = this.entityStartPos;
			this._flushCodePointConsumedAsCharacterReference(CODE_POINTS.AMPERSAND);
			this.state = !this._isCharacterReferenceInAttribute() && isAsciiAlphaNumeric(this.preprocessor.peek(1)) ? State.AMBIGUOUS_AMPERSAND : this.returnState;
		} else this.state = this.returnState;
	}
	_stateAmbiguousAmpersand(cp) {
		if (isAsciiAlphaNumeric(cp)) this._flushCodePointConsumedAsCharacterReference(cp);
		else {
			if (cp === CODE_POINTS.SEMICOLON) this._err(ERR.unknownNamedCharacterReference);
			this.state = this.returnState;
			this._callState(cp);
		}
	}
};
// ../../node_modules/.pnpm/parse5@8.0.1/node_modules/parse5/dist/parser/open-element-stack.js
const IMPLICIT_END_TAG_REQUIRED = /* @__PURE__ */ new Set([
	TAG_ID.DD,
	TAG_ID.DT,
	TAG_ID.LI,
	TAG_ID.OPTGROUP,
	TAG_ID.OPTION,
	TAG_ID.P,
	TAG_ID.RB,
	TAG_ID.RP,
	TAG_ID.RT,
	TAG_ID.RTC
]);
const IMPLICIT_END_TAG_REQUIRED_THOROUGHLY = /* @__PURE__ */ new Set([
	...IMPLICIT_END_TAG_REQUIRED,
	TAG_ID.CAPTION,
	TAG_ID.COLGROUP,
	TAG_ID.TBODY,
	TAG_ID.TD,
	TAG_ID.TFOOT,
	TAG_ID.TH,
	TAG_ID.THEAD,
	TAG_ID.TR
]);
const SCOPING_ELEMENTS_HTML = /* @__PURE__ */ new Set([
	TAG_ID.APPLET,
	TAG_ID.CAPTION,
	TAG_ID.HTML,
	TAG_ID.MARQUEE,
	TAG_ID.OBJECT,
	TAG_ID.TABLE,
	TAG_ID.TD,
	TAG_ID.TEMPLATE,
	TAG_ID.TH
]);
const SCOPING_ELEMENTS_HTML_LIST = /* @__PURE__ */ new Set([
	...SCOPING_ELEMENTS_HTML,
	TAG_ID.OL,
	TAG_ID.UL
]);
const SCOPING_ELEMENTS_HTML_BUTTON = /* @__PURE__ */ new Set([...SCOPING_ELEMENTS_HTML, TAG_ID.BUTTON]);
const SCOPING_ELEMENTS_MATHML = /* @__PURE__ */ new Set([
	TAG_ID.ANNOTATION_XML,
	TAG_ID.MI,
	TAG_ID.MN,
	TAG_ID.MO,
	TAG_ID.MS,
	TAG_ID.MTEXT
]);
const SCOPING_ELEMENTS_SVG = /* @__PURE__ */ new Set([
	TAG_ID.DESC,
	TAG_ID.FOREIGN_OBJECT,
	TAG_ID.TITLE
]);
const TABLE_ROW_CONTEXT = /* @__PURE__ */ new Set([
	TAG_ID.TR,
	TAG_ID.TEMPLATE,
	TAG_ID.HTML
]);
const TABLE_BODY_CONTEXT = /* @__PURE__ */ new Set([
	TAG_ID.TBODY,
	TAG_ID.TFOOT,
	TAG_ID.THEAD,
	TAG_ID.TEMPLATE,
	TAG_ID.HTML
]);
const TABLE_CONTEXT = /* @__PURE__ */ new Set([
	TAG_ID.TABLE,
	TAG_ID.TEMPLATE,
	TAG_ID.HTML
]);
const TABLE_CELLS = /* @__PURE__ */ new Set([TAG_ID.TD, TAG_ID.TH]);
var OpenElementStack = class {
	get currentTmplContentOrNode() {
		return this._isInTemplate() ? this.treeAdapter.getTemplateContent(this.current) : this.current;
	}
	constructor(document, treeAdapter, handler) {
		this.treeAdapter = treeAdapter;
		this.handler = handler;
		this.items = [];
		this.tagIDs = [];
		this.stackTop = -1;
		this.tmplCount = 0;
		this.currentTagId = TAG_ID.UNKNOWN;
		this.current = document;
	}
	_indexOf(element) {
		return this.items.lastIndexOf(element, this.stackTop);
	}
	_isInTemplate() {
		return this.currentTagId === TAG_ID.TEMPLATE && this.treeAdapter.getNamespaceURI(this.current) === NS.HTML;
	}
	_updateCurrentElement() {
		this.current = this.items[this.stackTop];
		this.currentTagId = this.tagIDs[this.stackTop];
	}
	push(element, tagID) {
		this.stackTop++;
		this.items[this.stackTop] = element;
		this.current = element;
		this.tagIDs[this.stackTop] = tagID;
		this.currentTagId = tagID;
		if (this._isInTemplate()) this.tmplCount++;
		this.handler.onItemPush(element, tagID, true);
	}
	pop() {
		const popped = this.current;
		if (this.tmplCount > 0 && this._isInTemplate()) this.tmplCount--;
		this.stackTop--;
		this._updateCurrentElement();
		this.handler.onItemPop(popped, true);
	}
	replace(oldElement, newElement) {
		const idx = this._indexOf(oldElement);
		this.items[idx] = newElement;
		if (idx === this.stackTop) this.current = newElement;
	}
	insertAfter(referenceElement, newElement, newElementID) {
		const insertionIdx = this._indexOf(referenceElement) + 1;
		this.items.splice(insertionIdx, 0, newElement);
		this.tagIDs.splice(insertionIdx, 0, newElementID);
		this.stackTop++;
		if (insertionIdx === this.stackTop) this._updateCurrentElement();
		if (this.current && this.currentTagId !== void 0) this.handler.onItemPush(this.current, this.currentTagId, insertionIdx === this.stackTop);
	}
	popUntilTagNamePopped(tagName) {
		let targetIdx = this.stackTop + 1;
		do
			targetIdx = this.tagIDs.lastIndexOf(tagName, targetIdx - 1);
		while (targetIdx > 0 && this.treeAdapter.getNamespaceURI(this.items[targetIdx]) !== NS.HTML);
		this.shortenToLength(Math.max(targetIdx, 0));
	}
	shortenToLength(idx) {
		while (this.stackTop >= idx) {
			const popped = this.current;
			if (this.tmplCount > 0 && this._isInTemplate()) this.tmplCount -= 1;
			this.stackTop--;
			this._updateCurrentElement();
			this.handler.onItemPop(popped, this.stackTop < idx);
		}
	}
	popUntilElementPopped(element) {
		const idx = this._indexOf(element);
		this.shortenToLength(Math.max(idx, 0));
	}
	popUntilPopped(tagNames, targetNS) {
		const idx = this._indexOfTagNames(tagNames, targetNS);
		this.shortenToLength(Math.max(idx, 0));
	}
	popUntilNumberedHeaderPopped() {
		this.popUntilPopped(NUMBERED_HEADERS, NS.HTML);
	}
	popUntilTableCellPopped() {
		this.popUntilPopped(TABLE_CELLS, NS.HTML);
	}
	popAllUpToHtmlElement() {
		this.tmplCount = 0;
		this.shortenToLength(1);
	}
	_indexOfTagNames(tagNames, namespace) {
		for (let i = this.stackTop; i >= 0; i--) if (tagNames.has(this.tagIDs[i]) && this.treeAdapter.getNamespaceURI(this.items[i]) === namespace) return i;
		return -1;
	}
	clearBackTo(tagNames, targetNS) {
		const idx = this._indexOfTagNames(tagNames, targetNS);
		this.shortenToLength(idx + 1);
	}
	clearBackToTableContext() {
		this.clearBackTo(TABLE_CONTEXT, NS.HTML);
	}
	clearBackToTableBodyContext() {
		this.clearBackTo(TABLE_BODY_CONTEXT, NS.HTML);
	}
	clearBackToTableRowContext() {
		this.clearBackTo(TABLE_ROW_CONTEXT, NS.HTML);
	}
	remove(element) {
		const idx = this._indexOf(element);
		if (idx >= 0) {
			if (idx === this.stackTop) this.pop();
			else {
				this.items.splice(idx, 1);
				this.tagIDs.splice(idx, 1);
				this.stackTop--;
				this._updateCurrentElement();
				this.handler.onItemPop(element, false);
			}
		}
	}
	tryPeekProperlyNestedBodyElement() {
		return this.stackTop >= 1 && this.tagIDs[1] === TAG_ID.BODY ? this.items[1] : null;
	}
	contains(element) {
		return this._indexOf(element) > -1;
	}
	getCommonAncestor(element) {
		const elementIdx = this._indexOf(element) - 1;
		return elementIdx >= 0 ? this.items[elementIdx] : null;
	}
	isRootHtmlElementCurrent() {
		return this.stackTop === 0 && this.tagIDs[0] === TAG_ID.HTML;
	}
	hasInDynamicScope(tagName, htmlScope) {
		for (let i = this.stackTop; i >= 0; i--) {
			const tn = this.tagIDs[i];
			switch (this.treeAdapter.getNamespaceURI(this.items[i])) {
				case NS.HTML:
					if (tn === tagName) return true;
					if (htmlScope.has(tn)) return false;
					break;
				case NS.SVG:
					if (SCOPING_ELEMENTS_SVG.has(tn)) return false;
					break;
				case NS.MATHML: if (SCOPING_ELEMENTS_MATHML.has(tn)) return false;
			}
		}
		return true;
	}
	hasInScope(tagName) {
		return this.hasInDynamicScope(tagName, SCOPING_ELEMENTS_HTML);
	}
	hasInListItemScope(tagName) {
		return this.hasInDynamicScope(tagName, SCOPING_ELEMENTS_HTML_LIST);
	}
	hasInButtonScope(tagName) {
		return this.hasInDynamicScope(tagName, SCOPING_ELEMENTS_HTML_BUTTON);
	}
	hasNumberedHeaderInScope() {
		for (let i = this.stackTop; i >= 0; i--) {
			const tn = this.tagIDs[i];
			switch (this.treeAdapter.getNamespaceURI(this.items[i])) {
				case NS.HTML:
					if (NUMBERED_HEADERS.has(tn)) return true;
					if (SCOPING_ELEMENTS_HTML.has(tn)) return false;
					break;
				case NS.SVG:
					if (SCOPING_ELEMENTS_SVG.has(tn)) return false;
					break;
				case NS.MATHML: if (SCOPING_ELEMENTS_MATHML.has(tn)) return false;
			}
		}
		return true;
	}
	hasInTableScope(tagName) {
		for (let i = this.stackTop; i >= 0; i--) {
			if (this.treeAdapter.getNamespaceURI(this.items[i]) !== NS.HTML) continue;
			switch (this.tagIDs[i]) {
				case tagName: return true;
				case TAG_ID.TABLE:
				case TAG_ID.HTML: return false;
			}
		}
		return true;
	}
	hasTableBodyContextInTableScope() {
		for (let i = this.stackTop; i >= 0; i--) {
			if (this.treeAdapter.getNamespaceURI(this.items[i]) !== NS.HTML) continue;
			switch (this.tagIDs[i]) {
				case TAG_ID.TBODY:
				case TAG_ID.THEAD:
				case TAG_ID.TFOOT: return true;
				case TAG_ID.TABLE:
				case TAG_ID.HTML: return false;
			}
		}
		return true;
	}
	hasInSelectScope(tagName) {
		for (let i = this.stackTop; i >= 0; i--) {
			if (this.treeAdapter.getNamespaceURI(this.items[i]) !== NS.HTML) continue;
			switch (this.tagIDs[i]) {
				case tagName: return true;
				case TAG_ID.OPTION:
				case TAG_ID.OPTGROUP: break;
				default: return false;
			}
		}
		return true;
	}
	generateImpliedEndTags() {
		while (this.currentTagId !== void 0 && IMPLICIT_END_TAG_REQUIRED.has(this.currentTagId)) this.pop();
	}
	generateImpliedEndTagsThoroughly() {
		while (this.currentTagId !== void 0 && IMPLICIT_END_TAG_REQUIRED_THOROUGHLY.has(this.currentTagId)) this.pop();
	}
	generateImpliedEndTagsWithExclusion(exclusionId) {
		while (this.currentTagId !== void 0 && this.currentTagId !== exclusionId && IMPLICIT_END_TAG_REQUIRED_THOROUGHLY.has(this.currentTagId)) this.pop();
	}
};
// ../../node_modules/.pnpm/parse5@8.0.1/node_modules/parse5/dist/parser/formatting-element-list.js
const NOAH_ARK_CAPACITY = 3;
var EntryType;
(function(EntryType) {
	EntryType[EntryType["Marker"] = 0] = "Marker";
	EntryType[EntryType["Element"] = 1] = "Element";
})(EntryType || (EntryType = {}));
const MARKER = { type: EntryType.Marker };
var FormattingElementList = class {
	constructor(treeAdapter) {
		this.treeAdapter = treeAdapter;
		this.entries = [];
		this.bookmark = null;
	}
	_getNoahArkConditionCandidates(newElement, neAttrs) {
		const candidates = [];
		const neAttrsLength = neAttrs.length;
		const neTagName = this.treeAdapter.getTagName(newElement);
		const neNamespaceURI = this.treeAdapter.getNamespaceURI(newElement);
		for (let i = 0; i < this.entries.length; i++) {
			const entry = this.entries[i];
			if (entry.type === EntryType.Marker) break;
			const { element } = entry;
			if (this.treeAdapter.getTagName(element) === neTagName && this.treeAdapter.getNamespaceURI(element) === neNamespaceURI) {
				const elementAttrs = this.treeAdapter.getAttrList(element);
				if (elementAttrs.length === neAttrsLength) candidates.push({
					idx: i,
					attrs: elementAttrs
				});
			}
		}
		return candidates;
	}
	_ensureNoahArkCondition(newElement) {
		if (this.entries.length < NOAH_ARK_CAPACITY) return;
		const neAttrs = this.treeAdapter.getAttrList(newElement);
		const candidates = this._getNoahArkConditionCandidates(newElement, neAttrs);
		if (candidates.length < NOAH_ARK_CAPACITY) return;
		const neAttrsMap = new Map(neAttrs.map((neAttr) => [neAttr.name, neAttr.value]));
		let validCandidates = 0;
		for (let i = 0; i < candidates.length; i++) {
			const candidate = candidates[i];
			if (candidate.attrs.every((cAttr) => neAttrsMap.get(cAttr.name) === cAttr.value)) {
				validCandidates += 1;
				if (validCandidates >= NOAH_ARK_CAPACITY) this.entries.splice(candidate.idx, 1);
			}
		}
	}
	insertMarker() {
		this.entries.unshift(MARKER);
	}
	pushElement(element, token) {
		this._ensureNoahArkCondition(element);
		this.entries.unshift({
			type: EntryType.Element,
			element,
			token
		});
	}
	insertElementAfterBookmark(element, token) {
		const bookmarkIdx = this.entries.indexOf(this.bookmark);
		this.entries.splice(bookmarkIdx, 0, {
			type: EntryType.Element,
			element,
			token
		});
	}
	removeEntry(entry) {
		const entryIndex = this.entries.indexOf(entry);
		if (entryIndex !== -1) this.entries.splice(entryIndex, 1);
	}
	/**
	* Clears the list of formatting elements up to the last marker.
	*
	* @see https://html.spec.whatwg.org/multipage/parsing.html#clear-the-list-of-active-formatting-elements-up-to-the-last-marker
	*/
	clearToLastMarker() {
		const markerIdx = this.entries.indexOf(MARKER);
		if (markerIdx === -1) this.entries.length = 0;
		else this.entries.splice(0, markerIdx + 1);
	}
	getElementEntryInScopeWithTagName(tagName) {
		const entry = this.entries.find((entry) => entry.type === EntryType.Marker || this.treeAdapter.getTagName(entry.element) === tagName);
		return entry && entry.type === EntryType.Element ? entry : null;
	}
	getElementEntry(element) {
		return this.entries.find((entry) => entry.type === EntryType.Element && entry.element === element);
	}
};
// ../../node_modules/.pnpm/parse5@8.0.1/node_modules/parse5/dist/tree-adapters/default.js
const defaultTreeAdapter = {
	createDocument() {
		return {
			nodeName: "#document",
			mode: DOCUMENT_MODE.NO_QUIRKS,
			childNodes: []
		};
	},
	createDocumentFragment() {
		return {
			nodeName: "#document-fragment",
			childNodes: []
		};
	},
	createElement(tagName, namespaceURI, attrs) {
		return {
			nodeName: tagName,
			tagName,
			attrs,
			namespaceURI,
			childNodes: [],
			parentNode: null
		};
	},
	createCommentNode(data) {
		return {
			nodeName: "#comment",
			data,
			parentNode: null
		};
	},
	createTextNode(value) {
		return {
			nodeName: "#text",
			value,
			parentNode: null
		};
	},
	appendChild(parentNode, newNode) {
		parentNode.childNodes.push(newNode);
		newNode.parentNode = parentNode;
	},
	insertBefore(parentNode, newNode, referenceNode) {
		const insertionIdx = parentNode.childNodes.indexOf(referenceNode);
		parentNode.childNodes.splice(insertionIdx, 0, newNode);
		newNode.parentNode = parentNode;
	},
	setTemplateContent(templateElement, contentElement) {
		templateElement.content = contentElement;
	},
	getTemplateContent(templateElement) {
		return templateElement.content;
	},
	setDocumentType(document, name, publicId, systemId) {
		const doctypeNode = document.childNodes.find((node) => node.nodeName === "#documentType");
		if (doctypeNode) {
			doctypeNode.name = name;
			doctypeNode.publicId = publicId;
			doctypeNode.systemId = systemId;
		} else defaultTreeAdapter.appendChild(document, {
			nodeName: "#documentType",
			name,
			publicId,
			systemId,
			parentNode: null
		});
	},
	setDocumentMode(document, mode) {
		document.mode = mode;
	},
	getDocumentMode(document) {
		return document.mode;
	},
	detachNode(node) {
		if (node.parentNode) {
			const idx = node.parentNode.childNodes.indexOf(node);
			node.parentNode.childNodes.splice(idx, 1);
			node.parentNode = null;
		}
	},
	insertText(parentNode, text) {
		if (parentNode.childNodes.length > 0) {
			const prevNode = parentNode.childNodes[parentNode.childNodes.length - 1];
			if (defaultTreeAdapter.isTextNode(prevNode)) {
				prevNode.value += text;
				return;
			}
		}
		defaultTreeAdapter.appendChild(parentNode, defaultTreeAdapter.createTextNode(text));
	},
	insertTextBefore(parentNode, text, referenceNode) {
		const prevNode = parentNode.childNodes[parentNode.childNodes.indexOf(referenceNode) - 1];
		if (prevNode && defaultTreeAdapter.isTextNode(prevNode)) prevNode.value += text;
		else defaultTreeAdapter.insertBefore(parentNode, defaultTreeAdapter.createTextNode(text), referenceNode);
	},
	adoptAttributes(recipient, attrs) {
		const recipientAttrsMap = new Set(recipient.attrs.map((attr) => attr.name));
		for (let j = 0; j < attrs.length; j++) if (!recipientAttrsMap.has(attrs[j].name)) recipient.attrs.push(attrs[j]);
	},
	getFirstChild(node) {
		return node.childNodes[0];
	},
	getChildNodes(node) {
		return node.childNodes;
	},
	getParentNode(node) {
		return node.parentNode;
	},
	getAttrList(element) {
		return element.attrs;
	},
	getTagName(element) {
		return element.tagName;
	},
	getNamespaceURI(element) {
		return element.namespaceURI;
	},
	getTextNodeContent(textNode) {
		return textNode.value;
	},
	getCommentNodeContent(commentNode) {
		return commentNode.data;
	},
	getDocumentTypeNodeName(doctypeNode) {
		return doctypeNode.name;
	},
	getDocumentTypeNodePublicId(doctypeNode) {
		return doctypeNode.publicId;
	},
	getDocumentTypeNodeSystemId(doctypeNode) {
		return doctypeNode.systemId;
	},
	isTextNode(node) {
		return node.nodeName === "#text";
	},
	isCommentNode(node) {
		return node.nodeName === "#comment";
	},
	isDocumentTypeNode(node) {
		return node.nodeName === "#documentType";
	},
	isElementNode(node) {
		return Object.prototype.hasOwnProperty.call(node, "tagName");
	},
	setNodeSourceCodeLocation(node, location) {
		node.sourceCodeLocation = location;
	},
	getNodeSourceCodeLocation(node) {
		return node.sourceCodeLocation;
	},
	updateNodeSourceCodeLocation(node, endLocation) {
		node.sourceCodeLocation = {
			...node.sourceCodeLocation,
			...endLocation
		};
	}
};
// ../../node_modules/.pnpm/parse5@8.0.1/node_modules/parse5/dist/common/doctype.js
const VALID_DOCTYPE_NAME = "html";
const VALID_SYSTEM_ID = "about:legacy-compat";
const QUIRKS_MODE_SYSTEM_ID = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd";
const QUIRKS_MODE_PUBLIC_ID_PREFIXES = [
	"+//silmaril//dtd html pro v0r11 19970101//",
	"-//as//dtd html 3.0 aswedit + extensions//",
	"-//advasoft ltd//dtd html 3.0 aswedit + extensions//",
	"-//ietf//dtd html 2.0 level 1//",
	"-//ietf//dtd html 2.0 level 2//",
	"-//ietf//dtd html 2.0 strict level 1//",
	"-//ietf//dtd html 2.0 strict level 2//",
	"-//ietf//dtd html 2.0 strict//",
	"-//ietf//dtd html 2.0//",
	"-//ietf//dtd html 2.1e//",
	"-//ietf//dtd html 3.0//",
	"-//ietf//dtd html 3.2 final//",
	"-//ietf//dtd html 3.2//",
	"-//ietf//dtd html 3//",
	"-//ietf//dtd html level 0//",
	"-//ietf//dtd html level 1//",
	"-//ietf//dtd html level 2//",
	"-//ietf//dtd html level 3//",
	"-//ietf//dtd html strict level 0//",
	"-//ietf//dtd html strict level 1//",
	"-//ietf//dtd html strict level 2//",
	"-//ietf//dtd html strict level 3//",
	"-//ietf//dtd html strict//",
	"-//ietf//dtd html//",
	"-//metrius//dtd metrius presentational//",
	"-//microsoft//dtd internet explorer 2.0 html strict//",
	"-//microsoft//dtd internet explorer 2.0 html//",
	"-//microsoft//dtd internet explorer 2.0 tables//",
	"-//microsoft//dtd internet explorer 3.0 html strict//",
	"-//microsoft//dtd internet explorer 3.0 html//",
	"-//microsoft//dtd internet explorer 3.0 tables//",
	"-//netscape comm. corp.//dtd html//",
	"-//netscape comm. corp.//dtd strict html//",
	"-//o'reilly and associates//dtd html 2.0//",
	"-//o'reilly and associates//dtd html extended 1.0//",
	"-//o'reilly and associates//dtd html extended relaxed 1.0//",
	"-//sq//dtd html 2.0 hotmetal + extensions//",
	"-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//",
	"-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//",
	"-//spyglass//dtd html 2.0 extended//",
	"-//sun microsystems corp.//dtd hotjava html//",
	"-//sun microsystems corp.//dtd hotjava strict html//",
	"-//w3c//dtd html 3 1995-03-24//",
	"-//w3c//dtd html 3.2 draft//",
	"-//w3c//dtd html 3.2 final//",
	"-//w3c//dtd html 3.2//",
	"-//w3c//dtd html 3.2s draft//",
	"-//w3c//dtd html 4.0 frameset//",
	"-//w3c//dtd html 4.0 transitional//",
	"-//w3c//dtd html experimental 19960712//",
	"-//w3c//dtd html experimental 970421//",
	"-//w3c//dtd w3 html//",
	"-//w3o//dtd w3 html 3.0//",
	"-//webtechs//dtd mozilla html 2.0//",
	"-//webtechs//dtd mozilla html//"
];
const QUIRKS_MODE_NO_SYSTEM_ID_PUBLIC_ID_PREFIXES = [
	...QUIRKS_MODE_PUBLIC_ID_PREFIXES,
	"-//w3c//dtd html 4.01 frameset//",
	"-//w3c//dtd html 4.01 transitional//"
];
const QUIRKS_MODE_PUBLIC_IDS = /* @__PURE__ */ new Set([
	"-//w3o//dtd w3 html strict 3.0//en//",
	"-/w3c/dtd html 4.0 transitional/en",
	"html"
]);
const LIMITED_QUIRKS_PUBLIC_ID_PREFIXES = ["-//w3c//dtd xhtml 1.0 frameset//", "-//w3c//dtd xhtml 1.0 transitional//"];
const LIMITED_QUIRKS_WITH_SYSTEM_ID_PUBLIC_ID_PREFIXES = [
	...LIMITED_QUIRKS_PUBLIC_ID_PREFIXES,
	"-//w3c//dtd html 4.01 frameset//",
	"-//w3c//dtd html 4.01 transitional//"
];
function hasPrefix(publicId, prefixes) {
	return prefixes.some((prefix) => publicId.startsWith(prefix));
}
function isConforming(token) {
	return token.name === VALID_DOCTYPE_NAME && token.publicId === null && (token.systemId === null || token.systemId === VALID_SYSTEM_ID);
}
function getDocumentMode(token) {
	if (token.name !== VALID_DOCTYPE_NAME) return DOCUMENT_MODE.QUIRKS;
	const { systemId } = token;
	if (systemId && systemId.toLowerCase() === QUIRKS_MODE_SYSTEM_ID) return DOCUMENT_MODE.QUIRKS;
	let { publicId } = token;
	if (publicId !== null) {
		publicId = publicId.toLowerCase();
		if (QUIRKS_MODE_PUBLIC_IDS.has(publicId)) return DOCUMENT_MODE.QUIRKS;
		let prefixes = systemId === null ? QUIRKS_MODE_NO_SYSTEM_ID_PUBLIC_ID_PREFIXES : QUIRKS_MODE_PUBLIC_ID_PREFIXES;
		if (hasPrefix(publicId, prefixes)) return DOCUMENT_MODE.QUIRKS;
		prefixes = systemId === null ? LIMITED_QUIRKS_PUBLIC_ID_PREFIXES : LIMITED_QUIRKS_WITH_SYSTEM_ID_PUBLIC_ID_PREFIXES;
		if (hasPrefix(publicId, prefixes)) return DOCUMENT_MODE.LIMITED_QUIRKS;
	}
	return DOCUMENT_MODE.NO_QUIRKS;
}
// ../../node_modules/.pnpm/parse5@8.0.1/node_modules/parse5/dist/common/foreign-content.js
const MIME_TYPES = {
	TEXT_HTML: "text/html",
	APPLICATION_XML: "application/xhtml+xml"
};
const DEFINITION_URL_ATTR = "definitionurl";
const ADJUSTED_DEFINITION_URL_ATTR = "definitionURL";
const SVG_ATTRS_ADJUSTMENT_MAP = new Map([
	"attributeName",
	"attributeType",
	"baseFrequency",
	"baseProfile",
	"calcMode",
	"clipPathUnits",
	"diffuseConstant",
	"edgeMode",
	"filterUnits",
	"glyphRef",
	"gradientTransform",
	"gradientUnits",
	"kernelMatrix",
	"kernelUnitLength",
	"keyPoints",
	"keySplines",
	"keyTimes",
	"lengthAdjust",
	"limitingConeAngle",
	"markerHeight",
	"markerUnits",
	"markerWidth",
	"maskContentUnits",
	"maskUnits",
	"numOctaves",
	"pathLength",
	"patternContentUnits",
	"patternTransform",
	"patternUnits",
	"pointsAtX",
	"pointsAtY",
	"pointsAtZ",
	"preserveAlpha",
	"preserveAspectRatio",
	"primitiveUnits",
	"refX",
	"refY",
	"repeatCount",
	"repeatDur",
	"requiredExtensions",
	"requiredFeatures",
	"specularConstant",
	"specularExponent",
	"spreadMethod",
	"startOffset",
	"stdDeviation",
	"stitchTiles",
	"surfaceScale",
	"systemLanguage",
	"tableValues",
	"targetX",
	"targetY",
	"textLength",
	"viewBox",
	"viewTarget",
	"xChannelSelector",
	"yChannelSelector",
	"zoomAndPan"
].map((attr) => [attr.toLowerCase(), attr]));
const XML_ATTRS_ADJUSTMENT_MAP = /* @__PURE__ */ new Map([
	["xlink:actuate", {
		prefix: "xlink",
		name: "actuate",
		namespace: NS.XLINK
	}],
	["xlink:arcrole", {
		prefix: "xlink",
		name: "arcrole",
		namespace: NS.XLINK
	}],
	["xlink:href", {
		prefix: "xlink",
		name: "href",
		namespace: NS.XLINK
	}],
	["xlink:role", {
		prefix: "xlink",
		name: "role",
		namespace: NS.XLINK
	}],
	["xlink:show", {
		prefix: "xlink",
		name: "show",
		namespace: NS.XLINK
	}],
	["xlink:title", {
		prefix: "xlink",
		name: "title",
		namespace: NS.XLINK
	}],
	["xlink:type", {
		prefix: "xlink",
		name: "type",
		namespace: NS.XLINK
	}],
	["xml:lang", {
		prefix: "xml",
		name: "lang",
		namespace: NS.XML
	}],
	["xml:space", {
		prefix: "xml",
		name: "space",
		namespace: NS.XML
	}],
	["xmlns", {
		prefix: "",
		name: "xmlns",
		namespace: NS.XMLNS
	}],
	["xmlns:xlink", {
		prefix: "xmlns",
		name: "xlink",
		namespace: NS.XMLNS
	}]
]);
const SVG_TAG_NAMES_ADJUSTMENT_MAP = new Map([
	"altGlyph",
	"altGlyphDef",
	"altGlyphItem",
	"animateColor",
	"animateMotion",
	"animateTransform",
	"clipPath",
	"feBlend",
	"feColorMatrix",
	"feComponentTransfer",
	"feComposite",
	"feConvolveMatrix",
	"feDiffuseLighting",
	"feDisplacementMap",
	"feDistantLight",
	"feFlood",
	"feFuncA",
	"feFuncB",
	"feFuncG",
	"feFuncR",
	"feGaussianBlur",
	"feImage",
	"feMerge",
	"feMergeNode",
	"feMorphology",
	"feOffset",
	"fePointLight",
	"feSpecularLighting",
	"feSpotLight",
	"feTile",
	"feTurbulence",
	"foreignObject",
	"glyphRef",
	"linearGradient",
	"radialGradient",
	"textPath"
].map((tn) => [tn.toLowerCase(), tn]));
const EXITS_FOREIGN_CONTENT = /* @__PURE__ */ new Set([
	TAG_ID.B,
	TAG_ID.BIG,
	TAG_ID.BLOCKQUOTE,
	TAG_ID.BODY,
	TAG_ID.BR,
	TAG_ID.CENTER,
	TAG_ID.CODE,
	TAG_ID.DD,
	TAG_ID.DIV,
	TAG_ID.DL,
	TAG_ID.DT,
	TAG_ID.EM,
	TAG_ID.EMBED,
	TAG_ID.H1,
	TAG_ID.H2,
	TAG_ID.H3,
	TAG_ID.H4,
	TAG_ID.H5,
	TAG_ID.H6,
	TAG_ID.HEAD,
	TAG_ID.HR,
	TAG_ID.I,
	TAG_ID.IMG,
	TAG_ID.LI,
	TAG_ID.LISTING,
	TAG_ID.MENU,
	TAG_ID.META,
	TAG_ID.NOBR,
	TAG_ID.OL,
	TAG_ID.P,
	TAG_ID.PRE,
	TAG_ID.RUBY,
	TAG_ID.S,
	TAG_ID.SMALL,
	TAG_ID.SPAN,
	TAG_ID.STRONG,
	TAG_ID.STRIKE,
	TAG_ID.SUB,
	TAG_ID.SUP,
	TAG_ID.TABLE,
	TAG_ID.TT,
	TAG_ID.U,
	TAG_ID.UL,
	TAG_ID.VAR
]);
function causesExit(startTagToken) {
	const tn = startTagToken.tagID;
	return tn === TAG_ID.FONT && startTagToken.attrs.some(({ name }) => name === ATTRS.COLOR || name === ATTRS.SIZE || name === ATTRS.FACE) || EXITS_FOREIGN_CONTENT.has(tn);
}
function adjustTokenMathMLAttrs(token) {
	for (let i = 0; i < token.attrs.length; i++) if (token.attrs[i].name === DEFINITION_URL_ATTR) {
		token.attrs[i].name = ADJUSTED_DEFINITION_URL_ATTR;
		break;
	}
}
function adjustTokenSVGAttrs(token) {
	for (let i = 0; i < token.attrs.length; i++) {
		const adjustedAttrName = SVG_ATTRS_ADJUSTMENT_MAP.get(token.attrs[i].name);
		if (adjustedAttrName != null) token.attrs[i].name = adjustedAttrName;
	}
}
function adjustTokenXMLAttrs(token) {
	for (let i = 0; i < token.attrs.length; i++) {
		const adjustedAttrEntry = XML_ATTRS_ADJUSTMENT_MAP.get(token.attrs[i].name);
		if (adjustedAttrEntry) {
			token.attrs[i].prefix = adjustedAttrEntry.prefix;
			token.attrs[i].name = adjustedAttrEntry.name;
			token.attrs[i].namespace = adjustedAttrEntry.namespace;
		}
	}
}
function adjustTokenSVGTagName(token) {
	const adjustedTagName = SVG_TAG_NAMES_ADJUSTMENT_MAP.get(token.tagName);
	if (adjustedTagName != null) {
		token.tagName = adjustedTagName;
		token.tagID = getTagID(token.tagName);
	}
}
function isMathMLTextIntegrationPoint(tn, ns) {
	return ns === NS.MATHML && (tn === TAG_ID.MI || tn === TAG_ID.MO || tn === TAG_ID.MN || tn === TAG_ID.MS || tn === TAG_ID.MTEXT);
}
function isHtmlIntegrationPoint(tn, ns, attrs) {
	if (ns === NS.MATHML && tn === TAG_ID.ANNOTATION_XML) {
		for (let i = 0; i < attrs.length; i++) if (attrs[i].name === ATTRS.ENCODING) {
			const value = attrs[i].value.toLowerCase();
			return value === MIME_TYPES.TEXT_HTML || value === MIME_TYPES.APPLICATION_XML;
		}
	}
	return ns === NS.SVG && (tn === TAG_ID.FOREIGN_OBJECT || tn === TAG_ID.DESC || tn === TAG_ID.TITLE);
}
function isIntegrationPoint(tn, ns, attrs, foreignNS) {
	return (!foreignNS || foreignNS === NS.HTML) && isHtmlIntegrationPoint(tn, ns, attrs) || (!foreignNS || foreignNS === NS.MATHML) && isMathMLTextIntegrationPoint(tn, ns);
}
// ../../node_modules/.pnpm/parse5@8.0.1/node_modules/parse5/dist/parser/index.js
const HIDDEN_INPUT_TYPE = "hidden";
const AA_OUTER_LOOP_ITER = 8;
const AA_INNER_LOOP_ITER = 3;
var InsertionMode;
(function(InsertionMode) {
	InsertionMode[InsertionMode["INITIAL"] = 0] = "INITIAL";
	InsertionMode[InsertionMode["BEFORE_HTML"] = 1] = "BEFORE_HTML";
	InsertionMode[InsertionMode["BEFORE_HEAD"] = 2] = "BEFORE_HEAD";
	InsertionMode[InsertionMode["IN_HEAD"] = 3] = "IN_HEAD";
	InsertionMode[InsertionMode["IN_HEAD_NO_SCRIPT"] = 4] = "IN_HEAD_NO_SCRIPT";
	InsertionMode[InsertionMode["AFTER_HEAD"] = 5] = "AFTER_HEAD";
	InsertionMode[InsertionMode["IN_BODY"] = 6] = "IN_BODY";
	InsertionMode[InsertionMode["TEXT"] = 7] = "TEXT";
	InsertionMode[InsertionMode["IN_TABLE"] = 8] = "IN_TABLE";
	InsertionMode[InsertionMode["IN_TABLE_TEXT"] = 9] = "IN_TABLE_TEXT";
	InsertionMode[InsertionMode["IN_CAPTION"] = 10] = "IN_CAPTION";
	InsertionMode[InsertionMode["IN_COLUMN_GROUP"] = 11] = "IN_COLUMN_GROUP";
	InsertionMode[InsertionMode["IN_TABLE_BODY"] = 12] = "IN_TABLE_BODY";
	InsertionMode[InsertionMode["IN_ROW"] = 13] = "IN_ROW";
	InsertionMode[InsertionMode["IN_CELL"] = 14] = "IN_CELL";
	InsertionMode[InsertionMode["IN_SELECT"] = 15] = "IN_SELECT";
	InsertionMode[InsertionMode["IN_SELECT_IN_TABLE"] = 16] = "IN_SELECT_IN_TABLE";
	InsertionMode[InsertionMode["IN_TEMPLATE"] = 17] = "IN_TEMPLATE";
	InsertionMode[InsertionMode["AFTER_BODY"] = 18] = "AFTER_BODY";
	InsertionMode[InsertionMode["IN_FRAMESET"] = 19] = "IN_FRAMESET";
	InsertionMode[InsertionMode["AFTER_FRAMESET"] = 20] = "AFTER_FRAMESET";
	InsertionMode[InsertionMode["AFTER_AFTER_BODY"] = 21] = "AFTER_AFTER_BODY";
	InsertionMode[InsertionMode["AFTER_AFTER_FRAMESET"] = 22] = "AFTER_AFTER_FRAMESET";
})(InsertionMode || (InsertionMode = {}));
const BASE_LOC = {
	startLine: -1,
	startCol: -1,
	startOffset: -1,
	endLine: -1,
	endCol: -1,
	endOffset: -1
};
const TABLE_STRUCTURE_TAGS = /* @__PURE__ */ new Set([
	TAG_ID.TABLE,
	TAG_ID.TBODY,
	TAG_ID.TFOOT,
	TAG_ID.THEAD,
	TAG_ID.TR
]);
const defaultParserOptions = {
	scriptingEnabled: true,
	sourceCodeLocationInfo: false,
	treeAdapter: defaultTreeAdapter,
	onParseError: null
};
var Parser = class {
	constructor(options, document, fragmentContext = null, scriptHandler = null) {
		this.fragmentContext = fragmentContext;
		this.scriptHandler = scriptHandler;
		this.currentToken = null;
		this.stopped = false;
		/** @internal */
		this.insertionMode = InsertionMode.INITIAL;
		/** @internal */
		this.originalInsertionMode = InsertionMode.INITIAL;
		/** @internal */
		this.headElement = null;
		/** @internal */
		this.formElement = null;
		/** Indicates that the current node is not an element in the HTML namespace */
		this.currentNotInHTML = false;
		/**
		* The template insertion mode stack is maintained from the left.
		* Ie. the topmost element will always have index 0.
		*
		* @internal
		*/
		this.tmplInsertionModeStack = [];
		/** @internal */
		this.pendingCharacterTokens = [];
		/** @internal */
		this.hasNonWhitespacePendingCharacterToken = false;
		/** @internal */
		this.framesetOk = true;
		/** @internal */
		this.skipNextNewLine = false;
		/** @internal */
		this.fosterParentingEnabled = false;
		this.options = {
			...defaultParserOptions,
			...options
		};
		this.treeAdapter = this.options.treeAdapter;
		this.onParseError = this.options.onParseError;
		if (this.onParseError) this.options.sourceCodeLocationInfo = true;
		this.document = document !== null && document !== void 0 ? document : this.treeAdapter.createDocument();
		this.tokenizer = new Tokenizer(this.options, this);
		this.activeFormattingElements = new FormattingElementList(this.treeAdapter);
		this.fragmentContextID = fragmentContext ? getTagID(this.treeAdapter.getTagName(fragmentContext)) : TAG_ID.UNKNOWN;
		this._setContextModes(fragmentContext !== null && fragmentContext !== void 0 ? fragmentContext : this.document, this.fragmentContextID);
		this.openElements = new OpenElementStack(this.document, this.treeAdapter, this);
	}
	static parse(html, options) {
		const parser = new this(options);
		parser.tokenizer.write(html, true);
		return parser.document;
	}
	static getFragmentParser(fragmentContext, options) {
		const opts = {
			...defaultParserOptions,
			...options
		};
		fragmentContext !== null && fragmentContext !== void 0 || (fragmentContext = opts.treeAdapter.createElement(TAG_NAMES.TEMPLATE, NS.HTML, []));
		const documentMock = opts.treeAdapter.createElement("documentmock", NS.HTML, []);
		const parser = new this(opts, documentMock, fragmentContext);
		if (parser.fragmentContextID === TAG_ID.TEMPLATE) parser.tmplInsertionModeStack.unshift(InsertionMode.IN_TEMPLATE);
		parser._initTokenizerForFragmentParsing();
		parser._insertFakeRootElement();
		parser._resetInsertionMode();
		parser._findFormInFragmentContext();
		return parser;
	}
	getFragment() {
		const rootElement = this.treeAdapter.getFirstChild(this.document);
		const fragment = this.treeAdapter.createDocumentFragment();
		this._adoptNodes(rootElement, fragment);
		return fragment;
	}
	/** @internal */
	_err(token, code, beforeToken) {
		var _a;
		if (!this.onParseError) return;
		const loc = (_a = token.location) !== null && _a !== void 0 ? _a : BASE_LOC;
		const err = {
			code,
			startLine: loc.startLine,
			startCol: loc.startCol,
			startOffset: loc.startOffset,
			endLine: beforeToken ? loc.startLine : loc.endLine,
			endCol: beforeToken ? loc.startCol : loc.endCol,
			endOffset: beforeToken ? loc.startOffset : loc.endOffset
		};
		this.onParseError(err);
	}
	/** @internal */
	onItemPush(node, tid, isTop) {
		var _a, _b;
		(_b = (_a = this.treeAdapter).onItemPush) === null || _b === void 0 || _b.call(_a, node);
		if (isTop && this.openElements.stackTop > 0) this._setContextModes(node, tid);
	}
	/** @internal */
	onItemPop(node, isTop) {
		var _a, _b;
		if (this.options.sourceCodeLocationInfo) this._setEndLocation(node, this.currentToken);
		(_b = (_a = this.treeAdapter).onItemPop) === null || _b === void 0 || _b.call(_a, node, this.openElements.current);
		if (isTop) {
			let current;
			let currentTagId;
			if (this.openElements.stackTop === 0 && this.fragmentContext) {
				current = this.fragmentContext;
				currentTagId = this.fragmentContextID;
			} else ({current, currentTagId} = this.openElements);
			this._setContextModes(current, currentTagId);
		}
	}
	_setContextModes(current, tid) {
		const isHTML = current === this.document || current && this.treeAdapter.getNamespaceURI(current) === NS.HTML;
		this.currentNotInHTML = !isHTML;
		this.tokenizer.inForeignNode = !isHTML && current !== void 0 && tid !== void 0 && !this._isIntegrationPoint(tid, current);
	}
	/** @protected */
	_switchToTextParsing(currentToken, nextTokenizerState) {
		this._insertElement(currentToken, NS.HTML);
		this.tokenizer.state = nextTokenizerState;
		this.originalInsertionMode = this.insertionMode;
		this.insertionMode = InsertionMode.TEXT;
	}
	switchToPlaintextParsing() {
		this.insertionMode = InsertionMode.TEXT;
		this.originalInsertionMode = InsertionMode.IN_BODY;
		this.tokenizer.state = TokenizerMode.PLAINTEXT;
	}
	/** @protected */
	_getAdjustedCurrentElement() {
		return this.openElements.stackTop === 0 && this.fragmentContext ? this.fragmentContext : this.openElements.current;
	}
	/** @protected */
	_findFormInFragmentContext() {
		let node = this.fragmentContext;
		while (node) {
			if (this.treeAdapter.getTagName(node) === TAG_NAMES.FORM) {
				this.formElement = node;
				break;
			}
			node = this.treeAdapter.getParentNode(node);
		}
	}
	_initTokenizerForFragmentParsing() {
		if (!this.fragmentContext || this.treeAdapter.getNamespaceURI(this.fragmentContext) !== NS.HTML) return;
		switch (this.fragmentContextID) {
			case TAG_ID.TITLE:
			case TAG_ID.TEXTAREA:
				this.tokenizer.state = TokenizerMode.RCDATA;
				break;
			case TAG_ID.STYLE:
			case TAG_ID.XMP:
			case TAG_ID.IFRAME:
			case TAG_ID.NOEMBED:
			case TAG_ID.NOFRAMES:
			case TAG_ID.NOSCRIPT:
				this.tokenizer.state = TokenizerMode.RAWTEXT;
				break;
			case TAG_ID.SCRIPT:
				this.tokenizer.state = TokenizerMode.SCRIPT_DATA;
				break;
			case TAG_ID.PLAINTEXT: this.tokenizer.state = TokenizerMode.PLAINTEXT;
		}
	}
	/** @protected */
	_setDocumentType(token) {
		const name = token.name || "";
		const publicId = token.publicId || "";
		const systemId = token.systemId || "";
		this.treeAdapter.setDocumentType(this.document, name, publicId, systemId);
		if (token.location) {
			const docTypeNode = this.treeAdapter.getChildNodes(this.document).find((node) => this.treeAdapter.isDocumentTypeNode(node));
			if (docTypeNode) this.treeAdapter.setNodeSourceCodeLocation(docTypeNode, token.location);
		}
	}
	/** @protected */
	_attachElementToTree(element, location) {
		if (this.options.sourceCodeLocationInfo) {
			const loc = location && {
				...location,
				startTag: location
			};
			this.treeAdapter.setNodeSourceCodeLocation(element, loc);
		}
		if (this._shouldFosterParentOnInsertion()) this._fosterParentElement(element);
		else {
			const parent = this.openElements.currentTmplContentOrNode;
			this.treeAdapter.appendChild(parent !== null && parent !== void 0 ? parent : this.document, element);
		}
	}
	/**
	* For self-closing tags. Add an element to the tree, but skip adding it
	* to the stack.
	*/
	/** @protected */
	_appendElement(token, namespaceURI) {
		const element = this.treeAdapter.createElement(token.tagName, namespaceURI, token.attrs);
		this._attachElementToTree(element, token.location);
	}
	/** @protected */
	_insertElement(token, namespaceURI) {
		const element = this.treeAdapter.createElement(token.tagName, namespaceURI, token.attrs);
		this._attachElementToTree(element, token.location);
		this.openElements.push(element, token.tagID);
	}
	/** @protected */
	_insertFakeElement(tagName, tagID) {
		const element = this.treeAdapter.createElement(tagName, NS.HTML, []);
		this._attachElementToTree(element, null);
		this.openElements.push(element, tagID);
	}
	/** @protected */
	_insertTemplate(token) {
		const tmpl = this.treeAdapter.createElement(token.tagName, NS.HTML, token.attrs);
		const content = this.treeAdapter.createDocumentFragment();
		this.treeAdapter.setTemplateContent(tmpl, content);
		this._attachElementToTree(tmpl, token.location);
		this.openElements.push(tmpl, token.tagID);
		if (this.options.sourceCodeLocationInfo) this.treeAdapter.setNodeSourceCodeLocation(content, null);
	}
	/** @protected */
	_insertFakeRootElement() {
		const element = this.treeAdapter.createElement(TAG_NAMES.HTML, NS.HTML, []);
		if (this.options.sourceCodeLocationInfo) this.treeAdapter.setNodeSourceCodeLocation(element, null);
		this.treeAdapter.appendChild(this.openElements.current, element);
		this.openElements.push(element, TAG_ID.HTML);
	}
	/** @protected */
	_appendCommentNode(token, parent) {
		const commentNode = this.treeAdapter.createCommentNode(token.data);
		this.treeAdapter.appendChild(parent, commentNode);
		if (this.options.sourceCodeLocationInfo) this.treeAdapter.setNodeSourceCodeLocation(commentNode, token.location);
	}
	/** @protected */
	_insertCharacters(token) {
		let parent;
		let beforeElement;
		if (this._shouldFosterParentOnInsertion()) {
			({parent, beforeElement} = this._findFosterParentingLocation());
			if (beforeElement) this.treeAdapter.insertTextBefore(parent, token.chars, beforeElement);
			else this.treeAdapter.insertText(parent, token.chars);
		} else {
			parent = this.openElements.currentTmplContentOrNode;
			this.treeAdapter.insertText(parent, token.chars);
		}
		if (!token.location) return;
		const siblings = this.treeAdapter.getChildNodes(parent);
		const textNode = siblings[(beforeElement ? siblings.lastIndexOf(beforeElement) : siblings.length) - 1];
		if (this.treeAdapter.getNodeSourceCodeLocation(textNode)) {
			const { endLine, endCol, endOffset } = token.location;
			this.treeAdapter.updateNodeSourceCodeLocation(textNode, {
				endLine,
				endCol,
				endOffset
			});
		} else if (this.options.sourceCodeLocationInfo) this.treeAdapter.setNodeSourceCodeLocation(textNode, token.location);
	}
	/** @protected */
	_adoptNodes(donor, recipient) {
		for (let child = this.treeAdapter.getFirstChild(donor); child; child = this.treeAdapter.getFirstChild(donor)) {
			this.treeAdapter.detachNode(child);
			this.treeAdapter.appendChild(recipient, child);
		}
	}
	/** @protected */
	_setEndLocation(element, closingToken) {
		if (this.treeAdapter.getNodeSourceCodeLocation(element) && closingToken.location) {
			const ctLoc = closingToken.location;
			const tn = this.treeAdapter.getTagName(element);
			const endLoc = closingToken.type === TokenType.END_TAG && tn === closingToken.tagName ? {
				endTag: { ...ctLoc },
				endLine: ctLoc.endLine,
				endCol: ctLoc.endCol,
				endOffset: ctLoc.endOffset
			} : {
				endLine: ctLoc.startLine,
				endCol: ctLoc.startCol,
				endOffset: ctLoc.startOffset
			};
			this.treeAdapter.updateNodeSourceCodeLocation(element, endLoc);
		}
	}
	shouldProcessStartTagTokenInForeignContent(token) {
		if (!this.currentNotInHTML) return false;
		let current;
		let currentTagId;
		if (this.openElements.stackTop === 0 && this.fragmentContext) {
			current = this.fragmentContext;
			currentTagId = this.fragmentContextID;
		} else ({current, currentTagId} = this.openElements);
		if (token.tagID === TAG_ID.SVG && this.treeAdapter.getTagName(current) === TAG_NAMES.ANNOTATION_XML && this.treeAdapter.getNamespaceURI(current) === NS.MATHML) return false;
		return this.tokenizer.inForeignNode || (token.tagID === TAG_ID.MGLYPH || token.tagID === TAG_ID.MALIGNMARK) && currentTagId !== void 0 && !this._isIntegrationPoint(currentTagId, current, NS.HTML);
	}
	/** @protected */
	_processToken(token) {
		switch (token.type) {
			case TokenType.CHARACTER:
				this.onCharacter(token);
				break;
			case TokenType.NULL_CHARACTER:
				this.onNullCharacter(token);
				break;
			case TokenType.COMMENT:
				this.onComment(token);
				break;
			case TokenType.DOCTYPE:
				this.onDoctype(token);
				break;
			case TokenType.START_TAG:
				this._processStartTag(token);
				break;
			case TokenType.END_TAG:
				this.onEndTag(token);
				break;
			case TokenType.EOF:
				this.onEof(token);
				break;
			case TokenType.WHITESPACE_CHARACTER: this.onWhitespaceCharacter(token);
		}
	}
	/** @protected */
	_isIntegrationPoint(tid, element, foreignNS) {
		return isIntegrationPoint(tid, this.treeAdapter.getNamespaceURI(element), this.treeAdapter.getAttrList(element), foreignNS);
	}
	/** @protected */
	_reconstructActiveFormattingElements() {
		const listLength = this.activeFormattingElements.entries.length;
		if (listLength) {
			const endIndex = this.activeFormattingElements.entries.findIndex((entry) => entry.type === EntryType.Marker || this.openElements.contains(entry.element));
			const unopenIdx = endIndex === -1 ? listLength - 1 : endIndex - 1;
			for (let i = unopenIdx; i >= 0; i--) {
				const entry = this.activeFormattingElements.entries[i];
				this._insertElement(entry.token, this.treeAdapter.getNamespaceURI(entry.element));
				entry.element = this.openElements.current;
			}
		}
	}
	/** @protected */
	_closeTableCell() {
		this.openElements.generateImpliedEndTags();
		this.openElements.popUntilTableCellPopped();
		this.activeFormattingElements.clearToLastMarker();
		this.insertionMode = InsertionMode.IN_ROW;
	}
	/** @protected */
	_closePElement() {
		this.openElements.generateImpliedEndTagsWithExclusion(TAG_ID.P);
		this.openElements.popUntilTagNamePopped(TAG_ID.P);
	}
	/** @protected */
	_resetInsertionMode() {
		for (let i = this.openElements.stackTop; i >= 0; i--) switch (i === 0 && this.fragmentContext ? this.fragmentContextID : this.openElements.tagIDs[i]) {
			case TAG_ID.TR:
				this.insertionMode = InsertionMode.IN_ROW;
				return;
			case TAG_ID.TBODY:
			case TAG_ID.THEAD:
			case TAG_ID.TFOOT:
				this.insertionMode = InsertionMode.IN_TABLE_BODY;
				return;
			case TAG_ID.CAPTION:
				this.insertionMode = InsertionMode.IN_CAPTION;
				return;
			case TAG_ID.COLGROUP:
				this.insertionMode = InsertionMode.IN_COLUMN_GROUP;
				return;
			case TAG_ID.TABLE:
				this.insertionMode = InsertionMode.IN_TABLE;
				return;
			case TAG_ID.BODY:
				this.insertionMode = InsertionMode.IN_BODY;
				return;
			case TAG_ID.FRAMESET:
				this.insertionMode = InsertionMode.IN_FRAMESET;
				return;
			case TAG_ID.SELECT:
				this._resetInsertionModeForSelect(i);
				return;
			case TAG_ID.TEMPLATE:
				this.insertionMode = this.tmplInsertionModeStack[0];
				return;
			case TAG_ID.HTML:
				this.insertionMode = this.headElement ? InsertionMode.AFTER_HEAD : InsertionMode.BEFORE_HEAD;
				return;
			case TAG_ID.TD:
			case TAG_ID.TH:
				if (i > 0) {
					this.insertionMode = InsertionMode.IN_CELL;
					return;
				}
				break;
			case TAG_ID.HEAD: if (i > 0) {
				this.insertionMode = InsertionMode.IN_HEAD;
				return;
			}
		}
		this.insertionMode = InsertionMode.IN_BODY;
	}
	/** @protected */
	_resetInsertionModeForSelect(selectIdx) {
		if (selectIdx > 0) for (let i = selectIdx - 1; i > 0; i--) {
			const tn = this.openElements.tagIDs[i];
			if (tn === TAG_ID.TEMPLATE) break;
			else if (tn === TAG_ID.TABLE) {
				this.insertionMode = InsertionMode.IN_SELECT_IN_TABLE;
				return;
			}
		}
		this.insertionMode = InsertionMode.IN_SELECT;
	}
	/** @protected */
	_isElementCausesFosterParenting(tn) {
		return TABLE_STRUCTURE_TAGS.has(tn);
	}
	/** @protected */
	_shouldFosterParentOnInsertion() {
		return this.fosterParentingEnabled && this.openElements.currentTagId !== void 0 && this._isElementCausesFosterParenting(this.openElements.currentTagId);
	}
	/** @protected */
	_findFosterParentingLocation() {
		for (let i = this.openElements.stackTop; i >= 0; i--) {
			const openElement = this.openElements.items[i];
			switch (this.openElements.tagIDs[i]) {
				case TAG_ID.TEMPLATE:
					if (this.treeAdapter.getNamespaceURI(openElement) === NS.HTML) return {
						parent: this.treeAdapter.getTemplateContent(openElement),
						beforeElement: null
					};
					break;
				case TAG_ID.TABLE: {
					const parent = this.treeAdapter.getParentNode(openElement);
					if (parent) return {
						parent,
						beforeElement: openElement
					};
					return {
						parent: this.openElements.items[i - 1],
						beforeElement: null
					};
				}
			}
		}
		return {
			parent: this.openElements.items[0],
			beforeElement: null
		};
	}
	/** @protected */
	_fosterParentElement(element) {
		const location = this._findFosterParentingLocation();
		if (location.beforeElement) this.treeAdapter.insertBefore(location.parent, element, location.beforeElement);
		else this.treeAdapter.appendChild(location.parent, element);
	}
	/** @protected */
	_isSpecialElement(element, id) {
		const ns = this.treeAdapter.getNamespaceURI(element);
		return SPECIAL_ELEMENTS[ns].has(id);
	}
	/** @internal */
	onCharacter(token) {
		this.skipNextNewLine = false;
		if (this.tokenizer.inForeignNode) {
			characterInForeignContent(this, token);
			return;
		}
		switch (this.insertionMode) {
			case InsertionMode.INITIAL:
				tokenInInitialMode(this, token);
				break;
			case InsertionMode.BEFORE_HTML:
				tokenBeforeHtml(this, token);
				break;
			case InsertionMode.BEFORE_HEAD:
				tokenBeforeHead(this, token);
				break;
			case InsertionMode.IN_HEAD:
				tokenInHead(this, token);
				break;
			case InsertionMode.IN_HEAD_NO_SCRIPT:
				tokenInHeadNoScript(this, token);
				break;
			case InsertionMode.AFTER_HEAD:
				tokenAfterHead(this, token);
				break;
			case InsertionMode.IN_BODY:
			case InsertionMode.IN_CAPTION:
			case InsertionMode.IN_CELL:
			case InsertionMode.IN_TEMPLATE:
				characterInBody(this, token);
				break;
			case InsertionMode.TEXT:
			case InsertionMode.IN_SELECT:
			case InsertionMode.IN_SELECT_IN_TABLE:
				this._insertCharacters(token);
				break;
			case InsertionMode.IN_TABLE:
			case InsertionMode.IN_TABLE_BODY:
			case InsertionMode.IN_ROW:
				characterInTable(this, token);
				break;
			case InsertionMode.IN_TABLE_TEXT:
				characterInTableText(this, token);
				break;
			case InsertionMode.IN_COLUMN_GROUP:
				tokenInColumnGroup(this, token);
				break;
			case InsertionMode.AFTER_BODY:
				tokenAfterBody(this, token);
				break;
			case InsertionMode.AFTER_AFTER_BODY: tokenAfterAfterBody(this, token);
		}
	}
	/** @internal */
	onNullCharacter(token) {
		this.skipNextNewLine = false;
		if (this.tokenizer.inForeignNode) {
			nullCharacterInForeignContent(this, token);
			return;
		}
		switch (this.insertionMode) {
			case InsertionMode.INITIAL:
				tokenInInitialMode(this, token);
				break;
			case InsertionMode.BEFORE_HTML:
				tokenBeforeHtml(this, token);
				break;
			case InsertionMode.BEFORE_HEAD:
				tokenBeforeHead(this, token);
				break;
			case InsertionMode.IN_HEAD:
				tokenInHead(this, token);
				break;
			case InsertionMode.IN_HEAD_NO_SCRIPT:
				tokenInHeadNoScript(this, token);
				break;
			case InsertionMode.AFTER_HEAD:
				tokenAfterHead(this, token);
				break;
			case InsertionMode.TEXT:
				this._insertCharacters(token);
				break;
			case InsertionMode.IN_TABLE:
			case InsertionMode.IN_TABLE_BODY:
			case InsertionMode.IN_ROW:
				characterInTable(this, token);
				break;
			case InsertionMode.IN_COLUMN_GROUP:
				tokenInColumnGroup(this, token);
				break;
			case InsertionMode.AFTER_BODY:
				tokenAfterBody(this, token);
				break;
			case InsertionMode.AFTER_AFTER_BODY: tokenAfterAfterBody(this, token);
		}
	}
	/** @internal */
	onComment(token) {
		this.skipNextNewLine = false;
		if (this.currentNotInHTML) {
			appendComment(this, token);
			return;
		}
		switch (this.insertionMode) {
			case InsertionMode.INITIAL:
			case InsertionMode.BEFORE_HTML:
			case InsertionMode.BEFORE_HEAD:
			case InsertionMode.IN_HEAD:
			case InsertionMode.IN_HEAD_NO_SCRIPT:
			case InsertionMode.AFTER_HEAD:
			case InsertionMode.IN_BODY:
			case InsertionMode.IN_TABLE:
			case InsertionMode.IN_CAPTION:
			case InsertionMode.IN_COLUMN_GROUP:
			case InsertionMode.IN_TABLE_BODY:
			case InsertionMode.IN_ROW:
			case InsertionMode.IN_CELL:
			case InsertionMode.IN_SELECT:
			case InsertionMode.IN_SELECT_IN_TABLE:
			case InsertionMode.IN_TEMPLATE:
			case InsertionMode.IN_FRAMESET:
			case InsertionMode.AFTER_FRAMESET:
				appendComment(this, token);
				break;
			case InsertionMode.IN_TABLE_TEXT:
				tokenInTableText(this, token);
				break;
			case InsertionMode.AFTER_BODY:
				appendCommentToRootHtmlElement(this, token);
				break;
			case InsertionMode.AFTER_AFTER_BODY:
			case InsertionMode.AFTER_AFTER_FRAMESET: appendCommentToDocument(this, token);
		}
	}
	/** @internal */
	onDoctype(token) {
		this.skipNextNewLine = false;
		switch (this.insertionMode) {
			case InsertionMode.INITIAL:
				doctypeInInitialMode(this, token);
				break;
			case InsertionMode.BEFORE_HEAD:
			case InsertionMode.IN_HEAD:
			case InsertionMode.IN_HEAD_NO_SCRIPT:
			case InsertionMode.AFTER_HEAD:
				this._err(token, ERR.misplacedDoctype);
				break;
			case InsertionMode.IN_TABLE_TEXT: tokenInTableText(this, token);
		}
	}
	/** @internal */
	onStartTag(token) {
		this.skipNextNewLine = false;
		this.currentToken = token;
		this._processStartTag(token);
		if (token.selfClosing && !token.ackSelfClosing) this._err(token, ERR.nonVoidHtmlElementStartTagWithTrailingSolidus);
	}
	/**
	* Processes a given start tag.
	*
	* `onStartTag` checks if a self-closing tag was recognized. When a token
	* is moved inbetween multiple insertion modes, this check for self-closing
	* could lead to false positives. To avoid this, `_processStartTag` is used
	* for nested calls.
	*
	* @param token The token to process.
	* @protected
	*/
	_processStartTag(token) {
		if (this.shouldProcessStartTagTokenInForeignContent(token)) startTagInForeignContent(this, token);
		else this._startTagOutsideForeignContent(token);
	}
	/** @protected */
	_startTagOutsideForeignContent(token) {
		switch (this.insertionMode) {
			case InsertionMode.INITIAL:
				tokenInInitialMode(this, token);
				break;
			case InsertionMode.BEFORE_HTML:
				startTagBeforeHtml(this, token);
				break;
			case InsertionMode.BEFORE_HEAD:
				startTagBeforeHead(this, token);
				break;
			case InsertionMode.IN_HEAD:
				startTagInHead(this, token);
				break;
			case InsertionMode.IN_HEAD_NO_SCRIPT:
				startTagInHeadNoScript(this, token);
				break;
			case InsertionMode.AFTER_HEAD:
				startTagAfterHead(this, token);
				break;
			case InsertionMode.IN_BODY:
				startTagInBody(this, token);
				break;
			case InsertionMode.IN_TABLE:
				startTagInTable(this, token);
				break;
			case InsertionMode.IN_TABLE_TEXT:
				tokenInTableText(this, token);
				break;
			case InsertionMode.IN_CAPTION:
				startTagInCaption(this, token);
				break;
			case InsertionMode.IN_COLUMN_GROUP:
				startTagInColumnGroup(this, token);
				break;
			case InsertionMode.IN_TABLE_BODY:
				startTagInTableBody(this, token);
				break;
			case InsertionMode.IN_ROW:
				startTagInRow(this, token);
				break;
			case InsertionMode.IN_CELL:
				startTagInCell(this, token);
				break;
			case InsertionMode.IN_SELECT:
				startTagInSelect(this, token);
				break;
			case InsertionMode.IN_SELECT_IN_TABLE:
				startTagInSelectInTable(this, token);
				break;
			case InsertionMode.IN_TEMPLATE:
				startTagInTemplate(this, token);
				break;
			case InsertionMode.AFTER_BODY:
				startTagAfterBody(this, token);
				break;
			case InsertionMode.IN_FRAMESET:
				startTagInFrameset(this, token);
				break;
			case InsertionMode.AFTER_FRAMESET:
				startTagAfterFrameset(this, token);
				break;
			case InsertionMode.AFTER_AFTER_BODY:
				startTagAfterAfterBody(this, token);
				break;
			case InsertionMode.AFTER_AFTER_FRAMESET: startTagAfterAfterFrameset(this, token);
		}
	}
	/** @internal */
	onEndTag(token) {
		this.skipNextNewLine = false;
		this.currentToken = token;
		if (this.currentNotInHTML) endTagInForeignContent(this, token);
		else this._endTagOutsideForeignContent(token);
	}
	/** @protected */
	_endTagOutsideForeignContent(token) {
		switch (this.insertionMode) {
			case InsertionMode.INITIAL:
				tokenInInitialMode(this, token);
				break;
			case InsertionMode.BEFORE_HTML:
				endTagBeforeHtml(this, token);
				break;
			case InsertionMode.BEFORE_HEAD:
				endTagBeforeHead(this, token);
				break;
			case InsertionMode.IN_HEAD:
				endTagInHead(this, token);
				break;
			case InsertionMode.IN_HEAD_NO_SCRIPT:
				endTagInHeadNoScript(this, token);
				break;
			case InsertionMode.AFTER_HEAD:
				endTagAfterHead(this, token);
				break;
			case InsertionMode.IN_BODY:
				endTagInBody(this, token);
				break;
			case InsertionMode.TEXT:
				endTagInText(this, token);
				break;
			case InsertionMode.IN_TABLE:
				endTagInTable(this, token);
				break;
			case InsertionMode.IN_TABLE_TEXT:
				tokenInTableText(this, token);
				break;
			case InsertionMode.IN_CAPTION:
				endTagInCaption(this, token);
				break;
			case InsertionMode.IN_COLUMN_GROUP:
				endTagInColumnGroup(this, token);
				break;
			case InsertionMode.IN_TABLE_BODY:
				endTagInTableBody(this, token);
				break;
			case InsertionMode.IN_ROW:
				endTagInRow(this, token);
				break;
			case InsertionMode.IN_CELL:
				endTagInCell(this, token);
				break;
			case InsertionMode.IN_SELECT:
				endTagInSelect(this, token);
				break;
			case InsertionMode.IN_SELECT_IN_TABLE:
				endTagInSelectInTable(this, token);
				break;
			case InsertionMode.IN_TEMPLATE:
				endTagInTemplate(this, token);
				break;
			case InsertionMode.AFTER_BODY:
				endTagAfterBody(this, token);
				break;
			case InsertionMode.IN_FRAMESET:
				endTagInFrameset(this, token);
				break;
			case InsertionMode.AFTER_FRAMESET:
				endTagAfterFrameset(this, token);
				break;
			case InsertionMode.AFTER_AFTER_BODY: tokenAfterAfterBody(this, token);
		}
	}
	/** @internal */
	onEof(token) {
		switch (this.insertionMode) {
			case InsertionMode.INITIAL:
				tokenInInitialMode(this, token);
				break;
			case InsertionMode.BEFORE_HTML:
				tokenBeforeHtml(this, token);
				break;
			case InsertionMode.BEFORE_HEAD:
				tokenBeforeHead(this, token);
				break;
			case InsertionMode.IN_HEAD:
				tokenInHead(this, token);
				break;
			case InsertionMode.IN_HEAD_NO_SCRIPT:
				tokenInHeadNoScript(this, token);
				break;
			case InsertionMode.AFTER_HEAD:
				tokenAfterHead(this, token);
				break;
			case InsertionMode.IN_BODY:
			case InsertionMode.IN_TABLE:
			case InsertionMode.IN_CAPTION:
			case InsertionMode.IN_COLUMN_GROUP:
			case InsertionMode.IN_TABLE_BODY:
			case InsertionMode.IN_ROW:
			case InsertionMode.IN_CELL:
			case InsertionMode.IN_SELECT:
			case InsertionMode.IN_SELECT_IN_TABLE:
				eofInBody(this, token);
				break;
			case InsertionMode.TEXT:
				eofInText(this, token);
				break;
			case InsertionMode.IN_TABLE_TEXT:
				tokenInTableText(this, token);
				break;
			case InsertionMode.IN_TEMPLATE:
				eofInTemplate(this, token);
				break;
			case InsertionMode.AFTER_BODY:
			case InsertionMode.IN_FRAMESET:
			case InsertionMode.AFTER_FRAMESET:
			case InsertionMode.AFTER_AFTER_BODY:
			case InsertionMode.AFTER_AFTER_FRAMESET: stopParsing(this, token);
		}
	}
	/** @internal */
	onWhitespaceCharacter(token) {
		if (this.skipNextNewLine) {
			this.skipNextNewLine = false;
			if (token.chars.charCodeAt(0) === CODE_POINTS.LINE_FEED) {
				if (token.chars.length === 1) return;
				token.chars = token.chars.substr(1);
			}
		}
		if (this.tokenizer.inForeignNode) {
			this._insertCharacters(token);
			return;
		}
		switch (this.insertionMode) {
			case InsertionMode.IN_HEAD:
			case InsertionMode.IN_HEAD_NO_SCRIPT:
			case InsertionMode.AFTER_HEAD:
			case InsertionMode.TEXT:
			case InsertionMode.IN_COLUMN_GROUP:
			case InsertionMode.IN_SELECT:
			case InsertionMode.IN_SELECT_IN_TABLE:
			case InsertionMode.IN_FRAMESET:
			case InsertionMode.AFTER_FRAMESET:
				this._insertCharacters(token);
				break;
			case InsertionMode.IN_BODY:
			case InsertionMode.IN_CAPTION:
			case InsertionMode.IN_CELL:
			case InsertionMode.IN_TEMPLATE:
			case InsertionMode.AFTER_BODY:
			case InsertionMode.AFTER_AFTER_BODY:
			case InsertionMode.AFTER_AFTER_FRAMESET:
				whitespaceCharacterInBody(this, token);
				break;
			case InsertionMode.IN_TABLE:
			case InsertionMode.IN_TABLE_BODY:
			case InsertionMode.IN_ROW:
				characterInTable(this, token);
				break;
			case InsertionMode.IN_TABLE_TEXT: whitespaceCharacterInTableText(this, token);
		}
	}
};
function aaObtainFormattingElementEntry(p, token) {
	let formattingElementEntry = p.activeFormattingElements.getElementEntryInScopeWithTagName(token.tagName);
	if (formattingElementEntry) {
		if (!p.openElements.contains(formattingElementEntry.element)) {
			p.activeFormattingElements.removeEntry(formattingElementEntry);
			formattingElementEntry = null;
		} else if (!p.openElements.hasInScope(token.tagID)) formattingElementEntry = null;
	} else genericEndTagInBody(p, token);
	return formattingElementEntry;
}
function aaObtainFurthestBlock(p, formattingElementEntry) {
	let furthestBlock = null;
	let idx = p.openElements.stackTop;
	for (; idx >= 0; idx--) {
		const element = p.openElements.items[idx];
		if (element === formattingElementEntry.element) break;
		if (p._isSpecialElement(element, p.openElements.tagIDs[idx])) furthestBlock = element;
	}
	if (!furthestBlock) {
		p.openElements.shortenToLength(Math.max(idx, 0));
		p.activeFormattingElements.removeEntry(formattingElementEntry);
	}
	return furthestBlock;
}
function aaInnerLoop(p, furthestBlock, formattingElement) {
	let lastElement = furthestBlock;
	let nextElement = p.openElements.getCommonAncestor(furthestBlock);
	for (let i = 0, element = nextElement; element !== formattingElement; i++, element = nextElement) {
		nextElement = p.openElements.getCommonAncestor(element);
		const elementEntry = p.activeFormattingElements.getElementEntry(element);
		const counterOverflow = elementEntry && i >= AA_INNER_LOOP_ITER;
		if (!elementEntry || counterOverflow) {
			if (counterOverflow) p.activeFormattingElements.removeEntry(elementEntry);
			p.openElements.remove(element);
		} else {
			element = aaRecreateElementFromEntry(p, elementEntry);
			if (lastElement === furthestBlock) p.activeFormattingElements.bookmark = elementEntry;
			p.treeAdapter.detachNode(lastElement);
			p.treeAdapter.appendChild(element, lastElement);
			lastElement = element;
		}
	}
	return lastElement;
}
function aaRecreateElementFromEntry(p, elementEntry) {
	const ns = p.treeAdapter.getNamespaceURI(elementEntry.element);
	const newElement = p.treeAdapter.createElement(elementEntry.token.tagName, ns, elementEntry.token.attrs);
	p.openElements.replace(elementEntry.element, newElement);
	elementEntry.element = newElement;
	return newElement;
}
function aaInsertLastNodeInCommonAncestor(p, commonAncestor, lastElement) {
	const tid = getTagID(p.treeAdapter.getTagName(commonAncestor));
	if (p._isElementCausesFosterParenting(tid)) p._fosterParentElement(lastElement);
	else {
		const ns = p.treeAdapter.getNamespaceURI(commonAncestor);
		if (tid === TAG_ID.TEMPLATE && ns === NS.HTML) commonAncestor = p.treeAdapter.getTemplateContent(commonAncestor);
		p.treeAdapter.appendChild(commonAncestor, lastElement);
	}
}
function aaReplaceFormattingElement(p, furthestBlock, formattingElementEntry) {
	const ns = p.treeAdapter.getNamespaceURI(formattingElementEntry.element);
	const { token } = formattingElementEntry;
	const newElement = p.treeAdapter.createElement(token.tagName, ns, token.attrs);
	p._adoptNodes(furthestBlock, newElement);
	p.treeAdapter.appendChild(furthestBlock, newElement);
	p.activeFormattingElements.insertElementAfterBookmark(newElement, token);
	p.activeFormattingElements.removeEntry(formattingElementEntry);
	p.openElements.remove(formattingElementEntry.element);
	p.openElements.insertAfter(furthestBlock, newElement, token.tagID);
}
function callAdoptionAgency(p, token) {
	for (let i = 0; i < AA_OUTER_LOOP_ITER; i++) {
		const formattingElementEntry = aaObtainFormattingElementEntry(p, token);
		if (!formattingElementEntry) break;
		const furthestBlock = aaObtainFurthestBlock(p, formattingElementEntry);
		if (!furthestBlock) break;
		p.activeFormattingElements.bookmark = formattingElementEntry;
		const lastElement = aaInnerLoop(p, furthestBlock, formattingElementEntry.element);
		const commonAncestor = p.openElements.getCommonAncestor(formattingElementEntry.element);
		p.treeAdapter.detachNode(lastElement);
		if (commonAncestor) aaInsertLastNodeInCommonAncestor(p, commonAncestor, lastElement);
		aaReplaceFormattingElement(p, furthestBlock, formattingElementEntry);
	}
}
function appendComment(p, token) {
	p._appendCommentNode(token, p.openElements.currentTmplContentOrNode);
}
function appendCommentToRootHtmlElement(p, token) {
	p._appendCommentNode(token, p.openElements.items[0]);
}
function appendCommentToDocument(p, token) {
	p._appendCommentNode(token, p.document);
}
function stopParsing(p, token) {
	p.stopped = true;
	if (token.location) {
		const target = p.fragmentContext ? 0 : 2;
		for (let i = p.openElements.stackTop; i >= target; i--) p._setEndLocation(p.openElements.items[i], token);
		if (!p.fragmentContext && p.openElements.stackTop >= 0) {
			const htmlElement = p.openElements.items[0];
			const htmlLocation = p.treeAdapter.getNodeSourceCodeLocation(htmlElement);
			if (htmlLocation && !htmlLocation.endTag) {
				p._setEndLocation(htmlElement, token);
				if (p.openElements.stackTop >= 1) {
					const bodyElement = p.openElements.items[1];
					const bodyLocation = p.treeAdapter.getNodeSourceCodeLocation(bodyElement);
					if (bodyLocation && !bodyLocation.endTag) p._setEndLocation(bodyElement, token);
				}
			}
		}
	}
}
function doctypeInInitialMode(p, token) {
	p._setDocumentType(token);
	const mode = token.forceQuirks ? DOCUMENT_MODE.QUIRKS : getDocumentMode(token);
	if (!isConforming(token)) p._err(token, ERR.nonConformingDoctype);
	p.treeAdapter.setDocumentMode(p.document, mode);
	p.insertionMode = InsertionMode.BEFORE_HTML;
}
function tokenInInitialMode(p, token) {
	p._err(token, ERR.missingDoctype, true);
	p.treeAdapter.setDocumentMode(p.document, DOCUMENT_MODE.QUIRKS);
	p.insertionMode = InsertionMode.BEFORE_HTML;
	p._processToken(token);
}
function startTagBeforeHtml(p, token) {
	if (token.tagID === TAG_ID.HTML) {
		p._insertElement(token, NS.HTML);
		p.insertionMode = InsertionMode.BEFORE_HEAD;
	} else tokenBeforeHtml(p, token);
}
function endTagBeforeHtml(p, token) {
	const tn = token.tagID;
	if (tn === TAG_ID.HTML || tn === TAG_ID.HEAD || tn === TAG_ID.BODY || tn === TAG_ID.BR) tokenBeforeHtml(p, token);
}
function tokenBeforeHtml(p, token) {
	p._insertFakeRootElement();
	p.insertionMode = InsertionMode.BEFORE_HEAD;
	p._processToken(token);
}
function startTagBeforeHead(p, token) {
	switch (token.tagID) {
		case TAG_ID.HTML:
			startTagInBody(p, token);
			break;
		case TAG_ID.HEAD:
			p._insertElement(token, NS.HTML);
			p.headElement = p.openElements.current;
			p.insertionMode = InsertionMode.IN_HEAD;
			break;
		default: tokenBeforeHead(p, token);
	}
}
function endTagBeforeHead(p, token) {
	const tn = token.tagID;
	if (tn === TAG_ID.HEAD || tn === TAG_ID.BODY || tn === TAG_ID.HTML || tn === TAG_ID.BR) tokenBeforeHead(p, token);
	else p._err(token, ERR.endTagWithoutMatchingOpenElement);
}
function tokenBeforeHead(p, token) {
	p._insertFakeElement(TAG_NAMES.HEAD, TAG_ID.HEAD);
	p.headElement = p.openElements.current;
	p.insertionMode = InsertionMode.IN_HEAD;
	p._processToken(token);
}
function startTagInHead(p, token) {
	switch (token.tagID) {
		case TAG_ID.HTML:
			startTagInBody(p, token);
			break;
		case TAG_ID.BASE:
		case TAG_ID.BASEFONT:
		case TAG_ID.BGSOUND:
		case TAG_ID.LINK:
		case TAG_ID.META:
			p._appendElement(token, NS.HTML);
			token.ackSelfClosing = true;
			break;
		case TAG_ID.TITLE:
			p._switchToTextParsing(token, TokenizerMode.RCDATA);
			break;
		case TAG_ID.NOSCRIPT:
			if (p.options.scriptingEnabled) p._switchToTextParsing(token, TokenizerMode.RAWTEXT);
			else {
				p._insertElement(token, NS.HTML);
				p.insertionMode = InsertionMode.IN_HEAD_NO_SCRIPT;
			}
			break;
		case TAG_ID.NOFRAMES:
		case TAG_ID.STYLE:
			p._switchToTextParsing(token, TokenizerMode.RAWTEXT);
			break;
		case TAG_ID.SCRIPT:
			p._switchToTextParsing(token, TokenizerMode.SCRIPT_DATA);
			break;
		case TAG_ID.TEMPLATE:
			p._insertTemplate(token);
			p.activeFormattingElements.insertMarker();
			p.framesetOk = false;
			p.insertionMode = InsertionMode.IN_TEMPLATE;
			p.tmplInsertionModeStack.unshift(InsertionMode.IN_TEMPLATE);
			break;
		case TAG_ID.HEAD:
			p._err(token, ERR.misplacedStartTagForHeadElement);
			break;
		default: tokenInHead(p, token);
	}
}
function endTagInHead(p, token) {
	switch (token.tagID) {
		case TAG_ID.HEAD:
			p.openElements.pop();
			p.insertionMode = InsertionMode.AFTER_HEAD;
			break;
		case TAG_ID.BODY:
		case TAG_ID.BR:
		case TAG_ID.HTML:
			tokenInHead(p, token);
			break;
		case TAG_ID.TEMPLATE:
			templateEndTagInHead(p, token);
			break;
		default: p._err(token, ERR.endTagWithoutMatchingOpenElement);
	}
}
function templateEndTagInHead(p, token) {
	if (p.openElements.tmplCount > 0) {
		p.openElements.generateImpliedEndTagsThoroughly();
		if (p.openElements.currentTagId !== TAG_ID.TEMPLATE) p._err(token, ERR.closingOfElementWithOpenChildElements);
		p.openElements.popUntilTagNamePopped(TAG_ID.TEMPLATE);
		p.activeFormattingElements.clearToLastMarker();
		p.tmplInsertionModeStack.shift();
		p._resetInsertionMode();
	} else p._err(token, ERR.endTagWithoutMatchingOpenElement);
}
function tokenInHead(p, token) {
	p.openElements.pop();
	p.insertionMode = InsertionMode.AFTER_HEAD;
	p._processToken(token);
}
function startTagInHeadNoScript(p, token) {
	switch (token.tagID) {
		case TAG_ID.HTML:
			startTagInBody(p, token);
			break;
		case TAG_ID.BASEFONT:
		case TAG_ID.BGSOUND:
		case TAG_ID.HEAD:
		case TAG_ID.LINK:
		case TAG_ID.META:
		case TAG_ID.NOFRAMES:
		case TAG_ID.STYLE:
			startTagInHead(p, token);
			break;
		case TAG_ID.NOSCRIPT:
			p._err(token, ERR.nestedNoscriptInHead);
			break;
		default: tokenInHeadNoScript(p, token);
	}
}
function endTagInHeadNoScript(p, token) {
	switch (token.tagID) {
		case TAG_ID.NOSCRIPT:
			p.openElements.pop();
			p.insertionMode = InsertionMode.IN_HEAD;
			break;
		case TAG_ID.BR:
			tokenInHeadNoScript(p, token);
			break;
		default: p._err(token, ERR.endTagWithoutMatchingOpenElement);
	}
}
function tokenInHeadNoScript(p, token) {
	p._err(token, token.type === TokenType.EOF ? ERR.openElementsLeftAfterEof : ERR.disallowedContentInNoscriptInHead);
	p.openElements.pop();
	p.insertionMode = InsertionMode.IN_HEAD;
	p._processToken(token);
}
function startTagAfterHead(p, token) {
	switch (token.tagID) {
		case TAG_ID.HTML:
			startTagInBody(p, token);
			break;
		case TAG_ID.BODY:
			p._insertElement(token, NS.HTML);
			p.framesetOk = false;
			p.insertionMode = InsertionMode.IN_BODY;
			break;
		case TAG_ID.FRAMESET:
			p._insertElement(token, NS.HTML);
			p.insertionMode = InsertionMode.IN_FRAMESET;
			break;
		case TAG_ID.BASE:
		case TAG_ID.BASEFONT:
		case TAG_ID.BGSOUND:
		case TAG_ID.LINK:
		case TAG_ID.META:
		case TAG_ID.NOFRAMES:
		case TAG_ID.SCRIPT:
		case TAG_ID.STYLE:
		case TAG_ID.TEMPLATE:
		case TAG_ID.TITLE:
			p._err(token, ERR.abandonedHeadElementChild);
			p.openElements.push(p.headElement, TAG_ID.HEAD);
			startTagInHead(p, token);
			p.openElements.remove(p.headElement);
			break;
		case TAG_ID.HEAD:
			p._err(token, ERR.misplacedStartTagForHeadElement);
			break;
		default: tokenAfterHead(p, token);
	}
}
function endTagAfterHead(p, token) {
	switch (token.tagID) {
		case TAG_ID.BODY:
		case TAG_ID.HTML:
		case TAG_ID.BR:
			tokenAfterHead(p, token);
			break;
		case TAG_ID.TEMPLATE:
			templateEndTagInHead(p, token);
			break;
		default: p._err(token, ERR.endTagWithoutMatchingOpenElement);
	}
}
function tokenAfterHead(p, token) {
	p._insertFakeElement(TAG_NAMES.BODY, TAG_ID.BODY);
	p.insertionMode = InsertionMode.IN_BODY;
	modeInBody(p, token);
}
function modeInBody(p, token) {
	switch (token.type) {
		case TokenType.CHARACTER:
			characterInBody(p, token);
			break;
		case TokenType.WHITESPACE_CHARACTER:
			whitespaceCharacterInBody(p, token);
			break;
		case TokenType.COMMENT:
			appendComment(p, token);
			break;
		case TokenType.START_TAG:
			startTagInBody(p, token);
			break;
		case TokenType.END_TAG:
			endTagInBody(p, token);
			break;
		case TokenType.EOF: eofInBody(p, token);
	}
}
function whitespaceCharacterInBody(p, token) {
	p._reconstructActiveFormattingElements();
	p._insertCharacters(token);
}
function characterInBody(p, token) {
	p._reconstructActiveFormattingElements();
	p._insertCharacters(token);
	p.framesetOk = false;
}
function htmlStartTagInBody(p, token) {
	if (p.openElements.tmplCount === 0) p.treeAdapter.adoptAttributes(p.openElements.items[0], token.attrs);
}
function bodyStartTagInBody(p, token) {
	const bodyElement = p.openElements.tryPeekProperlyNestedBodyElement();
	if (bodyElement && p.openElements.tmplCount === 0) {
		p.framesetOk = false;
		p.treeAdapter.adoptAttributes(bodyElement, token.attrs);
	}
}
function framesetStartTagInBody(p, token) {
	const bodyElement = p.openElements.tryPeekProperlyNestedBodyElement();
	if (p.framesetOk && bodyElement) {
		p.treeAdapter.detachNode(bodyElement);
		p.openElements.popAllUpToHtmlElement();
		p._insertElement(token, NS.HTML);
		p.insertionMode = InsertionMode.IN_FRAMESET;
	}
}
function addressStartTagInBody(p, token) {
	if (p.openElements.hasInButtonScope(TAG_ID.P)) p._closePElement();
	p._insertElement(token, NS.HTML);
}
function numberedHeaderStartTagInBody(p, token) {
	if (p.openElements.hasInButtonScope(TAG_ID.P)) p._closePElement();
	if (p.openElements.currentTagId !== void 0 && NUMBERED_HEADERS.has(p.openElements.currentTagId)) p.openElements.pop();
	p._insertElement(token, NS.HTML);
}
function preStartTagInBody(p, token) {
	if (p.openElements.hasInButtonScope(TAG_ID.P)) p._closePElement();
	p._insertElement(token, NS.HTML);
	p.skipNextNewLine = true;
	p.framesetOk = false;
}
function formStartTagInBody(p, token) {
	const inTemplate = p.openElements.tmplCount > 0;
	if (!p.formElement || inTemplate) {
		if (p.openElements.hasInButtonScope(TAG_ID.P)) p._closePElement();
		p._insertElement(token, NS.HTML);
		if (!inTemplate) p.formElement = p.openElements.current;
	}
}
function listItemStartTagInBody(p, token) {
	p.framesetOk = false;
	const tn = token.tagID;
	for (let i = p.openElements.stackTop; i >= 0; i--) {
		const elementId = p.openElements.tagIDs[i];
		if (tn === TAG_ID.LI && elementId === TAG_ID.LI || (tn === TAG_ID.DD || tn === TAG_ID.DT) && (elementId === TAG_ID.DD || elementId === TAG_ID.DT)) {
			p.openElements.generateImpliedEndTagsWithExclusion(elementId);
			p.openElements.popUntilTagNamePopped(elementId);
			break;
		}
		if (elementId !== TAG_ID.ADDRESS && elementId !== TAG_ID.DIV && elementId !== TAG_ID.P && p._isSpecialElement(p.openElements.items[i], elementId)) break;
	}
	if (p.openElements.hasInButtonScope(TAG_ID.P)) p._closePElement();
	p._insertElement(token, NS.HTML);
}
function plaintextStartTagInBody(p, token) {
	if (p.openElements.hasInButtonScope(TAG_ID.P)) p._closePElement();
	p._insertElement(token, NS.HTML);
	p.tokenizer.state = TokenizerMode.PLAINTEXT;
}
function buttonStartTagInBody(p, token) {
	if (p.openElements.hasInScope(TAG_ID.BUTTON)) {
		p.openElements.generateImpliedEndTags();
		p.openElements.popUntilTagNamePopped(TAG_ID.BUTTON);
	}
	p._reconstructActiveFormattingElements();
	p._insertElement(token, NS.HTML);
	p.framesetOk = false;
}
function aStartTagInBody(p, token) {
	const activeElementEntry = p.activeFormattingElements.getElementEntryInScopeWithTagName(TAG_NAMES.A);
	if (activeElementEntry) {
		callAdoptionAgency(p, token);
		p.openElements.remove(activeElementEntry.element);
		p.activeFormattingElements.removeEntry(activeElementEntry);
	}
	p._reconstructActiveFormattingElements();
	p._insertElement(token, NS.HTML);
	p.activeFormattingElements.pushElement(p.openElements.current, token);
}
function bStartTagInBody(p, token) {
	p._reconstructActiveFormattingElements();
	p._insertElement(token, NS.HTML);
	p.activeFormattingElements.pushElement(p.openElements.current, token);
}
function nobrStartTagInBody(p, token) {
	p._reconstructActiveFormattingElements();
	if (p.openElements.hasInScope(TAG_ID.NOBR)) {
		callAdoptionAgency(p, token);
		p._reconstructActiveFormattingElements();
	}
	p._insertElement(token, NS.HTML);
	p.activeFormattingElements.pushElement(p.openElements.current, token);
}
function appletStartTagInBody(p, token) {
	p._reconstructActiveFormattingElements();
	p._insertElement(token, NS.HTML);
	p.activeFormattingElements.insertMarker();
	p.framesetOk = false;
}
function tableStartTagInBody(p, token) {
	if (p.treeAdapter.getDocumentMode(p.document) !== DOCUMENT_MODE.QUIRKS && p.openElements.hasInButtonScope(TAG_ID.P)) p._closePElement();
	p._insertElement(token, NS.HTML);
	p.framesetOk = false;
	p.insertionMode = InsertionMode.IN_TABLE;
}
function areaStartTagInBody(p, token) {
	p._reconstructActiveFormattingElements();
	p._appendElement(token, NS.HTML);
	p.framesetOk = false;
	token.ackSelfClosing = true;
}
function isHiddenInput(token) {
	const inputType = getTokenAttr(token, ATTRS.TYPE);
	return inputType != null && inputType.toLowerCase() === HIDDEN_INPUT_TYPE;
}
function inputStartTagInBody(p, token) {
	p._reconstructActiveFormattingElements();
	p._appendElement(token, NS.HTML);
	if (!isHiddenInput(token)) p.framesetOk = false;
	token.ackSelfClosing = true;
}
function paramStartTagInBody(p, token) {
	p._appendElement(token, NS.HTML);
	token.ackSelfClosing = true;
}
function hrStartTagInBody(p, token) {
	if (p.openElements.hasInButtonScope(TAG_ID.P)) p._closePElement();
	p._appendElement(token, NS.HTML);
	p.framesetOk = false;
	token.ackSelfClosing = true;
}
function imageStartTagInBody(p, token) {
	token.tagName = TAG_NAMES.IMG;
	token.tagID = TAG_ID.IMG;
	areaStartTagInBody(p, token);
}
function textareaStartTagInBody(p, token) {
	p._insertElement(token, NS.HTML);
	p.skipNextNewLine = true;
	p.tokenizer.state = TokenizerMode.RCDATA;
	p.originalInsertionMode = p.insertionMode;
	p.framesetOk = false;
	p.insertionMode = InsertionMode.TEXT;
}
function xmpStartTagInBody(p, token) {
	if (p.openElements.hasInButtonScope(TAG_ID.P)) p._closePElement();
	p._reconstructActiveFormattingElements();
	p.framesetOk = false;
	p._switchToTextParsing(token, TokenizerMode.RAWTEXT);
}
function iframeStartTagInBody(p, token) {
	p.framesetOk = false;
	p._switchToTextParsing(token, TokenizerMode.RAWTEXT);
}
function rawTextStartTagInBody(p, token) {
	p._switchToTextParsing(token, TokenizerMode.RAWTEXT);
}
function selectStartTagInBody(p, token) {
	p._reconstructActiveFormattingElements();
	p._insertElement(token, NS.HTML);
	p.framesetOk = false;
	p.insertionMode = p.insertionMode === InsertionMode.IN_TABLE || p.insertionMode === InsertionMode.IN_CAPTION || p.insertionMode === InsertionMode.IN_TABLE_BODY || p.insertionMode === InsertionMode.IN_ROW || p.insertionMode === InsertionMode.IN_CELL ? InsertionMode.IN_SELECT_IN_TABLE : InsertionMode.IN_SELECT;
}
function optgroupStartTagInBody(p, token) {
	if (p.openElements.currentTagId === TAG_ID.OPTION) p.openElements.pop();
	p._reconstructActiveFormattingElements();
	p._insertElement(token, NS.HTML);
}
function rbStartTagInBody(p, token) {
	if (p.openElements.hasInScope(TAG_ID.RUBY)) p.openElements.generateImpliedEndTags();
	p._insertElement(token, NS.HTML);
}
function rtStartTagInBody(p, token) {
	if (p.openElements.hasInScope(TAG_ID.RUBY)) p.openElements.generateImpliedEndTagsWithExclusion(TAG_ID.RTC);
	p._insertElement(token, NS.HTML);
}
function mathStartTagInBody(p, token) {
	p._reconstructActiveFormattingElements();
	adjustTokenMathMLAttrs(token);
	adjustTokenXMLAttrs(token);
	if (token.selfClosing) p._appendElement(token, NS.MATHML);
	else p._insertElement(token, NS.MATHML);
	token.ackSelfClosing = true;
}
function svgStartTagInBody(p, token) {
	p._reconstructActiveFormattingElements();
	adjustTokenSVGAttrs(token);
	adjustTokenXMLAttrs(token);
	if (token.selfClosing) p._appendElement(token, NS.SVG);
	else p._insertElement(token, NS.SVG);
	token.ackSelfClosing = true;
}
function genericStartTagInBody(p, token) {
	p._reconstructActiveFormattingElements();
	p._insertElement(token, NS.HTML);
}
function startTagInBody(p, token) {
	switch (token.tagID) {
		case TAG_ID.I:
		case TAG_ID.S:
		case TAG_ID.B:
		case TAG_ID.U:
		case TAG_ID.EM:
		case TAG_ID.TT:
		case TAG_ID.BIG:
		case TAG_ID.CODE:
		case TAG_ID.FONT:
		case TAG_ID.SMALL:
		case TAG_ID.STRIKE:
		case TAG_ID.STRONG:
			bStartTagInBody(p, token);
			break;
		case TAG_ID.A:
			aStartTagInBody(p, token);
			break;
		case TAG_ID.H1:
		case TAG_ID.H2:
		case TAG_ID.H3:
		case TAG_ID.H4:
		case TAG_ID.H5:
		case TAG_ID.H6:
			numberedHeaderStartTagInBody(p, token);
			break;
		case TAG_ID.P:
		case TAG_ID.DL:
		case TAG_ID.OL:
		case TAG_ID.UL:
		case TAG_ID.DIV:
		case TAG_ID.DIR:
		case TAG_ID.NAV:
		case TAG_ID.MAIN:
		case TAG_ID.MENU:
		case TAG_ID.ASIDE:
		case TAG_ID.CENTER:
		case TAG_ID.FIGURE:
		case TAG_ID.FOOTER:
		case TAG_ID.HEADER:
		case TAG_ID.HGROUP:
		case TAG_ID.DIALOG:
		case TAG_ID.DETAILS:
		case TAG_ID.ADDRESS:
		case TAG_ID.ARTICLE:
		case TAG_ID.SEARCH:
		case TAG_ID.SECTION:
		case TAG_ID.SUMMARY:
		case TAG_ID.FIELDSET:
		case TAG_ID.BLOCKQUOTE:
		case TAG_ID.FIGCAPTION:
			addressStartTagInBody(p, token);
			break;
		case TAG_ID.LI:
		case TAG_ID.DD:
		case TAG_ID.DT:
			listItemStartTagInBody(p, token);
			break;
		case TAG_ID.BR:
		case TAG_ID.IMG:
		case TAG_ID.WBR:
		case TAG_ID.AREA:
		case TAG_ID.EMBED:
		case TAG_ID.KEYGEN:
			areaStartTagInBody(p, token);
			break;
		case TAG_ID.HR:
			hrStartTagInBody(p, token);
			break;
		case TAG_ID.RB:
		case TAG_ID.RTC:
			rbStartTagInBody(p, token);
			break;
		case TAG_ID.RT:
		case TAG_ID.RP:
			rtStartTagInBody(p, token);
			break;
		case TAG_ID.PRE:
		case TAG_ID.LISTING:
			preStartTagInBody(p, token);
			break;
		case TAG_ID.XMP:
			xmpStartTagInBody(p, token);
			break;
		case TAG_ID.SVG:
			svgStartTagInBody(p, token);
			break;
		case TAG_ID.HTML:
			htmlStartTagInBody(p, token);
			break;
		case TAG_ID.BASE:
		case TAG_ID.LINK:
		case TAG_ID.META:
		case TAG_ID.STYLE:
		case TAG_ID.TITLE:
		case TAG_ID.SCRIPT:
		case TAG_ID.BGSOUND:
		case TAG_ID.BASEFONT:
		case TAG_ID.TEMPLATE:
			startTagInHead(p, token);
			break;
		case TAG_ID.BODY:
			bodyStartTagInBody(p, token);
			break;
		case TAG_ID.FORM:
			formStartTagInBody(p, token);
			break;
		case TAG_ID.NOBR:
			nobrStartTagInBody(p, token);
			break;
		case TAG_ID.MATH:
			mathStartTagInBody(p, token);
			break;
		case TAG_ID.TABLE:
			tableStartTagInBody(p, token);
			break;
		case TAG_ID.INPUT:
			inputStartTagInBody(p, token);
			break;
		case TAG_ID.PARAM:
		case TAG_ID.TRACK:
		case TAG_ID.SOURCE:
			paramStartTagInBody(p, token);
			break;
		case TAG_ID.IMAGE:
			imageStartTagInBody(p, token);
			break;
		case TAG_ID.BUTTON:
			buttonStartTagInBody(p, token);
			break;
		case TAG_ID.APPLET:
		case TAG_ID.OBJECT:
		case TAG_ID.MARQUEE:
			appletStartTagInBody(p, token);
			break;
		case TAG_ID.IFRAME:
			iframeStartTagInBody(p, token);
			break;
		case TAG_ID.SELECT:
			selectStartTagInBody(p, token);
			break;
		case TAG_ID.OPTION:
		case TAG_ID.OPTGROUP:
			optgroupStartTagInBody(p, token);
			break;
		case TAG_ID.NOEMBED:
		case TAG_ID.NOFRAMES:
			rawTextStartTagInBody(p, token);
			break;
		case TAG_ID.FRAMESET:
			framesetStartTagInBody(p, token);
			break;
		case TAG_ID.TEXTAREA:
			textareaStartTagInBody(p, token);
			break;
		case TAG_ID.NOSCRIPT:
			if (p.options.scriptingEnabled) rawTextStartTagInBody(p, token);
			else genericStartTagInBody(p, token);
			break;
		case TAG_ID.PLAINTEXT:
			plaintextStartTagInBody(p, token);
			break;
		case TAG_ID.COL:
		case TAG_ID.TH:
		case TAG_ID.TD:
		case TAG_ID.TR:
		case TAG_ID.HEAD:
		case TAG_ID.FRAME:
		case TAG_ID.TBODY:
		case TAG_ID.TFOOT:
		case TAG_ID.THEAD:
		case TAG_ID.CAPTION:
		case TAG_ID.COLGROUP: break;
		default: genericStartTagInBody(p, token);
	}
}
function bodyEndTagInBody(p, token) {
	if (p.openElements.hasInScope(TAG_ID.BODY)) {
		p.insertionMode = InsertionMode.AFTER_BODY;
		if (p.options.sourceCodeLocationInfo) {
			const bodyElement = p.openElements.tryPeekProperlyNestedBodyElement();
			if (bodyElement) p._setEndLocation(bodyElement, token);
		}
	}
}
function htmlEndTagInBody(p, token) {
	if (p.openElements.hasInScope(TAG_ID.BODY)) {
		p.insertionMode = InsertionMode.AFTER_BODY;
		endTagAfterBody(p, token);
	}
}
function addressEndTagInBody(p, token) {
	const tn = token.tagID;
	if (p.openElements.hasInScope(tn)) {
		p.openElements.generateImpliedEndTags();
		p.openElements.popUntilTagNamePopped(tn);
	}
}
function formEndTagInBody(p) {
	const inTemplate = p.openElements.tmplCount > 0;
	const { formElement } = p;
	if (!inTemplate) p.formElement = null;
	if ((formElement || inTemplate) && p.openElements.hasInScope(TAG_ID.FORM)) {
		p.openElements.generateImpliedEndTags();
		if (inTemplate) p.openElements.popUntilTagNamePopped(TAG_ID.FORM);
		else if (formElement) p.openElements.remove(formElement);
	}
}
function pEndTagInBody(p) {
	if (!p.openElements.hasInButtonScope(TAG_ID.P)) p._insertFakeElement(TAG_NAMES.P, TAG_ID.P);
	p._closePElement();
}
function liEndTagInBody(p) {
	if (p.openElements.hasInListItemScope(TAG_ID.LI)) {
		p.openElements.generateImpliedEndTagsWithExclusion(TAG_ID.LI);
		p.openElements.popUntilTagNamePopped(TAG_ID.LI);
	}
}
function ddEndTagInBody(p, token) {
	const tn = token.tagID;
	if (p.openElements.hasInScope(tn)) {
		p.openElements.generateImpliedEndTagsWithExclusion(tn);
		p.openElements.popUntilTagNamePopped(tn);
	}
}
function numberedHeaderEndTagInBody(p) {
	if (p.openElements.hasNumberedHeaderInScope()) {
		p.openElements.generateImpliedEndTags();
		p.openElements.popUntilNumberedHeaderPopped();
	}
}
function appletEndTagInBody(p, token) {
	const tn = token.tagID;
	if (p.openElements.hasInScope(tn)) {
		p.openElements.generateImpliedEndTags();
		p.openElements.popUntilTagNamePopped(tn);
		p.activeFormattingElements.clearToLastMarker();
	}
}
function brEndTagInBody(p) {
	p._reconstructActiveFormattingElements();
	p._insertFakeElement(TAG_NAMES.BR, TAG_ID.BR);
	p.openElements.pop();
	p.framesetOk = false;
}
function genericEndTagInBody(p, token) {
	const tn = token.tagName;
	const tid = token.tagID;
	for (let i = p.openElements.stackTop; i > 0; i--) {
		const element = p.openElements.items[i];
		const elementId = p.openElements.tagIDs[i];
		if (tid === elementId && (tid !== TAG_ID.UNKNOWN || p.treeAdapter.getTagName(element) === tn)) {
			p.openElements.generateImpliedEndTagsWithExclusion(tid);
			if (p.openElements.stackTop >= i) p.openElements.shortenToLength(i);
			break;
		}
		if (p._isSpecialElement(element, elementId)) break;
	}
}
function endTagInBody(p, token) {
	switch (token.tagID) {
		case TAG_ID.A:
		case TAG_ID.B:
		case TAG_ID.I:
		case TAG_ID.S:
		case TAG_ID.U:
		case TAG_ID.EM:
		case TAG_ID.TT:
		case TAG_ID.BIG:
		case TAG_ID.CODE:
		case TAG_ID.FONT:
		case TAG_ID.NOBR:
		case TAG_ID.SMALL:
		case TAG_ID.STRIKE:
		case TAG_ID.STRONG:
			callAdoptionAgency(p, token);
			break;
		case TAG_ID.P:
			pEndTagInBody(p);
			break;
		case TAG_ID.DL:
		case TAG_ID.UL:
		case TAG_ID.OL:
		case TAG_ID.DIR:
		case TAG_ID.DIV:
		case TAG_ID.NAV:
		case TAG_ID.PRE:
		case TAG_ID.MAIN:
		case TAG_ID.MENU:
		case TAG_ID.ASIDE:
		case TAG_ID.BUTTON:
		case TAG_ID.CENTER:
		case TAG_ID.FIGURE:
		case TAG_ID.FOOTER:
		case TAG_ID.HEADER:
		case TAG_ID.HGROUP:
		case TAG_ID.DIALOG:
		case TAG_ID.ADDRESS:
		case TAG_ID.ARTICLE:
		case TAG_ID.DETAILS:
		case TAG_ID.SEARCH:
		case TAG_ID.SECTION:
		case TAG_ID.SUMMARY:
		case TAG_ID.LISTING:
		case TAG_ID.FIELDSET:
		case TAG_ID.BLOCKQUOTE:
		case TAG_ID.FIGCAPTION:
			addressEndTagInBody(p, token);
			break;
		case TAG_ID.LI:
			liEndTagInBody(p);
			break;
		case TAG_ID.DD:
		case TAG_ID.DT:
			ddEndTagInBody(p, token);
			break;
		case TAG_ID.H1:
		case TAG_ID.H2:
		case TAG_ID.H3:
		case TAG_ID.H4:
		case TAG_ID.H5:
		case TAG_ID.H6:
			numberedHeaderEndTagInBody(p);
			break;
		case TAG_ID.BR:
			brEndTagInBody(p);
			break;
		case TAG_ID.BODY:
			bodyEndTagInBody(p, token);
			break;
		case TAG_ID.HTML:
			htmlEndTagInBody(p, token);
			break;
		case TAG_ID.FORM:
			formEndTagInBody(p);
			break;
		case TAG_ID.APPLET:
		case TAG_ID.OBJECT:
		case TAG_ID.MARQUEE:
			appletEndTagInBody(p, token);
			break;
		case TAG_ID.TEMPLATE:
			templateEndTagInHead(p, token);
			break;
		default: genericEndTagInBody(p, token);
	}
}
function eofInBody(p, token) {
	if (p.tmplInsertionModeStack.length > 0) eofInTemplate(p, token);
	else stopParsing(p, token);
}
function endTagInText(p, token) {
	var _a;
	if (token.tagID === TAG_ID.SCRIPT) (_a = p.scriptHandler) === null || _a === void 0 || _a.call(p, p.openElements.current);
	p.openElements.pop();
	p.insertionMode = p.originalInsertionMode;
}
function eofInText(p, token) {
	p._err(token, ERR.eofInElementThatCanContainOnlyText);
	p.openElements.pop();
	p.insertionMode = p.originalInsertionMode;
	p.onEof(token);
}
function characterInTable(p, token) {
	if (p.openElements.currentTagId !== void 0 && TABLE_STRUCTURE_TAGS.has(p.openElements.currentTagId)) {
		p.pendingCharacterTokens.length = 0;
		p.hasNonWhitespacePendingCharacterToken = false;
		p.originalInsertionMode = p.insertionMode;
		p.insertionMode = InsertionMode.IN_TABLE_TEXT;
		switch (token.type) {
			case TokenType.CHARACTER:
				characterInTableText(p, token);
				break;
			case TokenType.WHITESPACE_CHARACTER: whitespaceCharacterInTableText(p, token);
		}
	} else tokenInTable(p, token);
}
function captionStartTagInTable(p, token) {
	p.openElements.clearBackToTableContext();
	p.activeFormattingElements.insertMarker();
	p._insertElement(token, NS.HTML);
	p.insertionMode = InsertionMode.IN_CAPTION;
}
function colgroupStartTagInTable(p, token) {
	p.openElements.clearBackToTableContext();
	p._insertElement(token, NS.HTML);
	p.insertionMode = InsertionMode.IN_COLUMN_GROUP;
}
function colStartTagInTable(p, token) {
	p.openElements.clearBackToTableContext();
	p._insertFakeElement(TAG_NAMES.COLGROUP, TAG_ID.COLGROUP);
	p.insertionMode = InsertionMode.IN_COLUMN_GROUP;
	startTagInColumnGroup(p, token);
}
function tbodyStartTagInTable(p, token) {
	p.openElements.clearBackToTableContext();
	p._insertElement(token, NS.HTML);
	p.insertionMode = InsertionMode.IN_TABLE_BODY;
}
function tdStartTagInTable(p, token) {
	p.openElements.clearBackToTableContext();
	p._insertFakeElement(TAG_NAMES.TBODY, TAG_ID.TBODY);
	p.insertionMode = InsertionMode.IN_TABLE_BODY;
	startTagInTableBody(p, token);
}
function tableStartTagInTable(p, token) {
	if (p.openElements.hasInTableScope(TAG_ID.TABLE)) {
		p.openElements.popUntilTagNamePopped(TAG_ID.TABLE);
		p._resetInsertionMode();
		p._processStartTag(token);
	}
}
function inputStartTagInTable(p, token) {
	if (isHiddenInput(token)) p._appendElement(token, NS.HTML);
	else tokenInTable(p, token);
	token.ackSelfClosing = true;
}
function formStartTagInTable(p, token) {
	if (!p.formElement && p.openElements.tmplCount === 0) {
		p._insertElement(token, NS.HTML);
		p.formElement = p.openElements.current;
		p.openElements.pop();
	}
}
function startTagInTable(p, token) {
	switch (token.tagID) {
		case TAG_ID.TD:
		case TAG_ID.TH:
		case TAG_ID.TR:
			tdStartTagInTable(p, token);
			break;
		case TAG_ID.STYLE:
		case TAG_ID.SCRIPT:
		case TAG_ID.TEMPLATE:
			startTagInHead(p, token);
			break;
		case TAG_ID.COL:
			colStartTagInTable(p, token);
			break;
		case TAG_ID.FORM:
			formStartTagInTable(p, token);
			break;
		case TAG_ID.TABLE:
			tableStartTagInTable(p, token);
			break;
		case TAG_ID.TBODY:
		case TAG_ID.TFOOT:
		case TAG_ID.THEAD:
			tbodyStartTagInTable(p, token);
			break;
		case TAG_ID.INPUT:
			inputStartTagInTable(p, token);
			break;
		case TAG_ID.CAPTION:
			captionStartTagInTable(p, token);
			break;
		case TAG_ID.COLGROUP:
			colgroupStartTagInTable(p, token);
			break;
		default: tokenInTable(p, token);
	}
}
function endTagInTable(p, token) {
	switch (token.tagID) {
		case TAG_ID.TABLE:
			if (p.openElements.hasInTableScope(TAG_ID.TABLE)) {
				p.openElements.popUntilTagNamePopped(TAG_ID.TABLE);
				p._resetInsertionMode();
			}
			break;
		case TAG_ID.TEMPLATE:
			templateEndTagInHead(p, token);
			break;
		case TAG_ID.BODY:
		case TAG_ID.CAPTION:
		case TAG_ID.COL:
		case TAG_ID.COLGROUP:
		case TAG_ID.HTML:
		case TAG_ID.TBODY:
		case TAG_ID.TD:
		case TAG_ID.TFOOT:
		case TAG_ID.TH:
		case TAG_ID.THEAD:
		case TAG_ID.TR: break;
		default: tokenInTable(p, token);
	}
}
function tokenInTable(p, token) {
	const savedFosterParentingState = p.fosterParentingEnabled;
	p.fosterParentingEnabled = true;
	modeInBody(p, token);
	p.fosterParentingEnabled = savedFosterParentingState;
}
function whitespaceCharacterInTableText(p, token) {
	p.pendingCharacterTokens.push(token);
}
function characterInTableText(p, token) {
	p.pendingCharacterTokens.push(token);
	p.hasNonWhitespacePendingCharacterToken = true;
}
function tokenInTableText(p, token) {
	let i = 0;
	if (p.hasNonWhitespacePendingCharacterToken) for (; i < p.pendingCharacterTokens.length; i++) tokenInTable(p, p.pendingCharacterTokens[i]);
	else for (; i < p.pendingCharacterTokens.length; i++) p._insertCharacters(p.pendingCharacterTokens[i]);
	p.insertionMode = p.originalInsertionMode;
	p._processToken(token);
}
const TABLE_VOID_ELEMENTS = /* @__PURE__ */ new Set([
	TAG_ID.CAPTION,
	TAG_ID.COL,
	TAG_ID.COLGROUP,
	TAG_ID.TBODY,
	TAG_ID.TD,
	TAG_ID.TFOOT,
	TAG_ID.TH,
	TAG_ID.THEAD,
	TAG_ID.TR
]);
function startTagInCaption(p, token) {
	if (TABLE_VOID_ELEMENTS.has(token.tagID)) {
		if (p.openElements.hasInTableScope(TAG_ID.CAPTION)) {
			p.openElements.generateImpliedEndTags();
			p.openElements.popUntilTagNamePopped(TAG_ID.CAPTION);
			p.activeFormattingElements.clearToLastMarker();
			p.insertionMode = InsertionMode.IN_TABLE;
			startTagInTable(p, token);
		}
	} else startTagInBody(p, token);
}
function endTagInCaption(p, token) {
	const tn = token.tagID;
	switch (tn) {
		case TAG_ID.CAPTION:
		case TAG_ID.TABLE:
			if (p.openElements.hasInTableScope(TAG_ID.CAPTION)) {
				p.openElements.generateImpliedEndTags();
				p.openElements.popUntilTagNamePopped(TAG_ID.CAPTION);
				p.activeFormattingElements.clearToLastMarker();
				p.insertionMode = InsertionMode.IN_TABLE;
				if (tn === TAG_ID.TABLE) endTagInTable(p, token);
			}
			break;
		case TAG_ID.BODY:
		case TAG_ID.COL:
		case TAG_ID.COLGROUP:
		case TAG_ID.HTML:
		case TAG_ID.TBODY:
		case TAG_ID.TD:
		case TAG_ID.TFOOT:
		case TAG_ID.TH:
		case TAG_ID.THEAD:
		case TAG_ID.TR: break;
		default: endTagInBody(p, token);
	}
}
function startTagInColumnGroup(p, token) {
	switch (token.tagID) {
		case TAG_ID.HTML:
			startTagInBody(p, token);
			break;
		case TAG_ID.COL:
			p._appendElement(token, NS.HTML);
			token.ackSelfClosing = true;
			break;
		case TAG_ID.TEMPLATE:
			startTagInHead(p, token);
			break;
		default: tokenInColumnGroup(p, token);
	}
}
function endTagInColumnGroup(p, token) {
	switch (token.tagID) {
		case TAG_ID.COLGROUP:
			if (p.openElements.currentTagId === TAG_ID.COLGROUP) {
				p.openElements.pop();
				p.insertionMode = InsertionMode.IN_TABLE;
			}
			break;
		case TAG_ID.TEMPLATE:
			templateEndTagInHead(p, token);
			break;
		case TAG_ID.COL: break;
		default: tokenInColumnGroup(p, token);
	}
}
function tokenInColumnGroup(p, token) {
	if (p.openElements.currentTagId === TAG_ID.COLGROUP) {
		p.openElements.pop();
		p.insertionMode = InsertionMode.IN_TABLE;
		p._processToken(token);
	}
}
function startTagInTableBody(p, token) {
	switch (token.tagID) {
		case TAG_ID.TR:
			p.openElements.clearBackToTableBodyContext();
			p._insertElement(token, NS.HTML);
			p.insertionMode = InsertionMode.IN_ROW;
			break;
		case TAG_ID.TH:
		case TAG_ID.TD:
			p.openElements.clearBackToTableBodyContext();
			p._insertFakeElement(TAG_NAMES.TR, TAG_ID.TR);
			p.insertionMode = InsertionMode.IN_ROW;
			startTagInRow(p, token);
			break;
		case TAG_ID.CAPTION:
		case TAG_ID.COL:
		case TAG_ID.COLGROUP:
		case TAG_ID.TBODY:
		case TAG_ID.TFOOT:
		case TAG_ID.THEAD:
			if (p.openElements.hasTableBodyContextInTableScope()) {
				p.openElements.clearBackToTableBodyContext();
				p.openElements.pop();
				p.insertionMode = InsertionMode.IN_TABLE;
				startTagInTable(p, token);
			}
			break;
		default: startTagInTable(p, token);
	}
}
function endTagInTableBody(p, token) {
	const tn = token.tagID;
	switch (token.tagID) {
		case TAG_ID.TBODY:
		case TAG_ID.TFOOT:
		case TAG_ID.THEAD:
			if (p.openElements.hasInTableScope(tn)) {
				p.openElements.clearBackToTableBodyContext();
				p.openElements.pop();
				p.insertionMode = InsertionMode.IN_TABLE;
			}
			break;
		case TAG_ID.TABLE:
			if (p.openElements.hasTableBodyContextInTableScope()) {
				p.openElements.clearBackToTableBodyContext();
				p.openElements.pop();
				p.insertionMode = InsertionMode.IN_TABLE;
				endTagInTable(p, token);
			}
			break;
		case TAG_ID.BODY:
		case TAG_ID.CAPTION:
		case TAG_ID.COL:
		case TAG_ID.COLGROUP:
		case TAG_ID.HTML:
		case TAG_ID.TD:
		case TAG_ID.TH:
		case TAG_ID.TR: break;
		default: endTagInTable(p, token);
	}
}
function startTagInRow(p, token) {
	switch (token.tagID) {
		case TAG_ID.TH:
		case TAG_ID.TD:
			p.openElements.clearBackToTableRowContext();
			p._insertElement(token, NS.HTML);
			p.insertionMode = InsertionMode.IN_CELL;
			p.activeFormattingElements.insertMarker();
			break;
		case TAG_ID.CAPTION:
		case TAG_ID.COL:
		case TAG_ID.COLGROUP:
		case TAG_ID.TBODY:
		case TAG_ID.TFOOT:
		case TAG_ID.THEAD:
		case TAG_ID.TR:
			if (p.openElements.hasInTableScope(TAG_ID.TR)) {
				p.openElements.clearBackToTableRowContext();
				p.openElements.pop();
				p.insertionMode = InsertionMode.IN_TABLE_BODY;
				startTagInTableBody(p, token);
			}
			break;
		default: startTagInTable(p, token);
	}
}
function endTagInRow(p, token) {
	switch (token.tagID) {
		case TAG_ID.TR:
			if (p.openElements.hasInTableScope(TAG_ID.TR)) {
				p.openElements.clearBackToTableRowContext();
				p.openElements.pop();
				p.insertionMode = InsertionMode.IN_TABLE_BODY;
			}
			break;
		case TAG_ID.TABLE:
			if (p.openElements.hasInTableScope(TAG_ID.TR)) {
				p.openElements.clearBackToTableRowContext();
				p.openElements.pop();
				p.insertionMode = InsertionMode.IN_TABLE_BODY;
				endTagInTableBody(p, token);
			}
			break;
		case TAG_ID.TBODY:
		case TAG_ID.TFOOT:
		case TAG_ID.THEAD:
			if (p.openElements.hasInTableScope(token.tagID) || p.openElements.hasInTableScope(TAG_ID.TR)) {
				p.openElements.clearBackToTableRowContext();
				p.openElements.pop();
				p.insertionMode = InsertionMode.IN_TABLE_BODY;
				endTagInTableBody(p, token);
			}
			break;
		case TAG_ID.BODY:
		case TAG_ID.CAPTION:
		case TAG_ID.COL:
		case TAG_ID.COLGROUP:
		case TAG_ID.HTML:
		case TAG_ID.TD:
		case TAG_ID.TH: break;
		default: endTagInTable(p, token);
	}
}
function startTagInCell(p, token) {
	if (TABLE_VOID_ELEMENTS.has(token.tagID)) {
		if (p.openElements.hasInTableScope(TAG_ID.TD) || p.openElements.hasInTableScope(TAG_ID.TH)) {
			p._closeTableCell();
			startTagInRow(p, token);
		}
	} else startTagInBody(p, token);
}
function endTagInCell(p, token) {
	const tn = token.tagID;
	switch (tn) {
		case TAG_ID.TD:
		case TAG_ID.TH:
			if (p.openElements.hasInTableScope(tn)) {
				p.openElements.generateImpliedEndTags();
				p.openElements.popUntilTagNamePopped(tn);
				p.activeFormattingElements.clearToLastMarker();
				p.insertionMode = InsertionMode.IN_ROW;
			}
			break;
		case TAG_ID.TABLE:
		case TAG_ID.TBODY:
		case TAG_ID.TFOOT:
		case TAG_ID.THEAD:
		case TAG_ID.TR:
			if (p.openElements.hasInTableScope(tn)) {
				p._closeTableCell();
				endTagInRow(p, token);
			}
			break;
		case TAG_ID.BODY:
		case TAG_ID.CAPTION:
		case TAG_ID.COL:
		case TAG_ID.COLGROUP:
		case TAG_ID.HTML: break;
		default: endTagInBody(p, token);
	}
}
function startTagInSelect(p, token) {
	switch (token.tagID) {
		case TAG_ID.HTML:
			startTagInBody(p, token);
			break;
		case TAG_ID.OPTION:
			if (p.openElements.currentTagId === TAG_ID.OPTION) p.openElements.pop();
			p._insertElement(token, NS.HTML);
			break;
		case TAG_ID.OPTGROUP:
			if (p.openElements.currentTagId === TAG_ID.OPTION) p.openElements.pop();
			if (p.openElements.currentTagId === TAG_ID.OPTGROUP) p.openElements.pop();
			p._insertElement(token, NS.HTML);
			break;
		case TAG_ID.HR:
			if (p.openElements.currentTagId === TAG_ID.OPTION) p.openElements.pop();
			if (p.openElements.currentTagId === TAG_ID.OPTGROUP) p.openElements.pop();
			p._appendElement(token, NS.HTML);
			token.ackSelfClosing = true;
			break;
		case TAG_ID.INPUT:
		case TAG_ID.KEYGEN:
		case TAG_ID.TEXTAREA:
		case TAG_ID.SELECT:
			if (p.openElements.hasInSelectScope(TAG_ID.SELECT)) {
				p.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
				p._resetInsertionMode();
				if (token.tagID !== TAG_ID.SELECT) p._processStartTag(token);
			}
			break;
		case TAG_ID.SCRIPT:
		case TAG_ID.TEMPLATE: startTagInHead(p, token);
	}
}
function endTagInSelect(p, token) {
	switch (token.tagID) {
		case TAG_ID.OPTGROUP:
			if (p.openElements.stackTop > 0 && p.openElements.currentTagId === TAG_ID.OPTION && p.openElements.tagIDs[p.openElements.stackTop - 1] === TAG_ID.OPTGROUP) p.openElements.pop();
			if (p.openElements.currentTagId === TAG_ID.OPTGROUP) p.openElements.pop();
			break;
		case TAG_ID.OPTION:
			if (p.openElements.currentTagId === TAG_ID.OPTION) p.openElements.pop();
			break;
		case TAG_ID.SELECT:
			if (p.openElements.hasInSelectScope(TAG_ID.SELECT)) {
				p.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
				p._resetInsertionMode();
			}
			break;
		case TAG_ID.TEMPLATE: templateEndTagInHead(p, token);
	}
}
function startTagInSelectInTable(p, token) {
	const tn = token.tagID;
	if (tn === TAG_ID.CAPTION || tn === TAG_ID.TABLE || tn === TAG_ID.TBODY || tn === TAG_ID.TFOOT || tn === TAG_ID.THEAD || tn === TAG_ID.TR || tn === TAG_ID.TD || tn === TAG_ID.TH) {
		p.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
		p._resetInsertionMode();
		p._processStartTag(token);
	} else startTagInSelect(p, token);
}
function endTagInSelectInTable(p, token) {
	const tn = token.tagID;
	if (tn === TAG_ID.CAPTION || tn === TAG_ID.TABLE || tn === TAG_ID.TBODY || tn === TAG_ID.TFOOT || tn === TAG_ID.THEAD || tn === TAG_ID.TR || tn === TAG_ID.TD || tn === TAG_ID.TH) {
		if (p.openElements.hasInTableScope(tn)) {
			p.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
			p._resetInsertionMode();
			p.onEndTag(token);
		}
	} else endTagInSelect(p, token);
}
function startTagInTemplate(p, token) {
	switch (token.tagID) {
		case TAG_ID.BASE:
		case TAG_ID.BASEFONT:
		case TAG_ID.BGSOUND:
		case TAG_ID.LINK:
		case TAG_ID.META:
		case TAG_ID.NOFRAMES:
		case TAG_ID.SCRIPT:
		case TAG_ID.STYLE:
		case TAG_ID.TEMPLATE:
		case TAG_ID.TITLE:
			startTagInHead(p, token);
			break;
		case TAG_ID.CAPTION:
		case TAG_ID.COLGROUP:
		case TAG_ID.TBODY:
		case TAG_ID.TFOOT:
		case TAG_ID.THEAD:
			p.tmplInsertionModeStack[0] = InsertionMode.IN_TABLE;
			p.insertionMode = InsertionMode.IN_TABLE;
			startTagInTable(p, token);
			break;
		case TAG_ID.COL:
			p.tmplInsertionModeStack[0] = InsertionMode.IN_COLUMN_GROUP;
			p.insertionMode = InsertionMode.IN_COLUMN_GROUP;
			startTagInColumnGroup(p, token);
			break;
		case TAG_ID.TR:
			p.tmplInsertionModeStack[0] = InsertionMode.IN_TABLE_BODY;
			p.insertionMode = InsertionMode.IN_TABLE_BODY;
			startTagInTableBody(p, token);
			break;
		case TAG_ID.TD:
		case TAG_ID.TH:
			p.tmplInsertionModeStack[0] = InsertionMode.IN_ROW;
			p.insertionMode = InsertionMode.IN_ROW;
			startTagInRow(p, token);
			break;
		default:
			p.tmplInsertionModeStack[0] = InsertionMode.IN_BODY;
			p.insertionMode = InsertionMode.IN_BODY;
			startTagInBody(p, token);
	}
}
function endTagInTemplate(p, token) {
	if (token.tagID === TAG_ID.TEMPLATE) templateEndTagInHead(p, token);
}
function eofInTemplate(p, token) {
	if (p.openElements.tmplCount > 0) {
		p.openElements.popUntilTagNamePopped(TAG_ID.TEMPLATE);
		p.activeFormattingElements.clearToLastMarker();
		p.tmplInsertionModeStack.shift();
		p._resetInsertionMode();
		p.onEof(token);
	} else stopParsing(p, token);
}
function startTagAfterBody(p, token) {
	if (token.tagID === TAG_ID.HTML) startTagInBody(p, token);
	else tokenAfterBody(p, token);
}
function endTagAfterBody(p, token) {
	var _a;
	if (token.tagID === TAG_ID.HTML) {
		if (!p.fragmentContext) p.insertionMode = InsertionMode.AFTER_AFTER_BODY;
		if (p.options.sourceCodeLocationInfo && p.openElements.tagIDs[0] === TAG_ID.HTML) {
			p._setEndLocation(p.openElements.items[0], token);
			const bodyElement = p.openElements.items[1];
			if (bodyElement && !((_a = p.treeAdapter.getNodeSourceCodeLocation(bodyElement)) === null || _a === void 0 ? void 0 : _a.endTag)) p._setEndLocation(bodyElement, token);
		}
	} else tokenAfterBody(p, token);
}
function tokenAfterBody(p, token) {
	p.insertionMode = InsertionMode.IN_BODY;
	modeInBody(p, token);
}
function startTagInFrameset(p, token) {
	switch (token.tagID) {
		case TAG_ID.HTML:
			startTagInBody(p, token);
			break;
		case TAG_ID.FRAMESET:
			p._insertElement(token, NS.HTML);
			break;
		case TAG_ID.FRAME:
			p._appendElement(token, NS.HTML);
			token.ackSelfClosing = true;
			break;
		case TAG_ID.NOFRAMES: startTagInHead(p, token);
	}
}
function endTagInFrameset(p, token) {
	if (token.tagID === TAG_ID.FRAMESET && !p.openElements.isRootHtmlElementCurrent()) {
		p.openElements.pop();
		if (!p.fragmentContext && p.openElements.currentTagId !== TAG_ID.FRAMESET) p.insertionMode = InsertionMode.AFTER_FRAMESET;
	}
}
function startTagAfterFrameset(p, token) {
	switch (token.tagID) {
		case TAG_ID.HTML:
			startTagInBody(p, token);
			break;
		case TAG_ID.NOFRAMES: startTagInHead(p, token);
	}
}
function endTagAfterFrameset(p, token) {
	if (token.tagID === TAG_ID.HTML) p.insertionMode = InsertionMode.AFTER_AFTER_FRAMESET;
}
function startTagAfterAfterBody(p, token) {
	if (token.tagID === TAG_ID.HTML) startTagInBody(p, token);
	else tokenAfterAfterBody(p, token);
}
function tokenAfterAfterBody(p, token) {
	p.insertionMode = InsertionMode.IN_BODY;
	modeInBody(p, token);
}
function startTagAfterAfterFrameset(p, token) {
	switch (token.tagID) {
		case TAG_ID.HTML:
			startTagInBody(p, token);
			break;
		case TAG_ID.NOFRAMES: startTagInHead(p, token);
	}
}
function nullCharacterInForeignContent(p, token) {
	token.chars = "�";
	p._insertCharacters(token);
}
function characterInForeignContent(p, token) {
	p._insertCharacters(token);
	p.framesetOk = false;
}
function popUntilHtmlOrIntegrationPoint(p) {
	while (p.treeAdapter.getNamespaceURI(p.openElements.current) !== NS.HTML && p.openElements.currentTagId !== void 0 && !p._isIntegrationPoint(p.openElements.currentTagId, p.openElements.current)) p.openElements.pop();
}
function startTagInForeignContent(p, token) {
	if (causesExit(token)) {
		popUntilHtmlOrIntegrationPoint(p);
		p._startTagOutsideForeignContent(token);
	} else {
		const current = p._getAdjustedCurrentElement();
		const currentNs = p.treeAdapter.getNamespaceURI(current);
		if (currentNs === NS.MATHML) adjustTokenMathMLAttrs(token);
		else if (currentNs === NS.SVG) {
			adjustTokenSVGTagName(token);
			adjustTokenSVGAttrs(token);
		}
		adjustTokenXMLAttrs(token);
		if (token.selfClosing) p._appendElement(token, currentNs);
		else p._insertElement(token, currentNs);
		token.ackSelfClosing = true;
	}
}
function endTagInForeignContent(p, token) {
	if (token.tagID === TAG_ID.P || token.tagID === TAG_ID.BR) {
		popUntilHtmlOrIntegrationPoint(p);
		p._endTagOutsideForeignContent(token);
		return;
	}
	for (let i = p.openElements.stackTop; i > 0; i--) {
		const element = p.openElements.items[i];
		if (p.treeAdapter.getNamespaceURI(element) === NS.HTML) {
			p._endTagOutsideForeignContent(token);
			break;
		}
		const tagName = p.treeAdapter.getTagName(element);
		if (tagName.toLowerCase() === token.tagName) {
			token.tagName = tagName;
			p.openElements.shortenToLength(i);
			break;
		}
	}
}
// ../../node_modules/.pnpm/parse5@8.0.1/node_modules/parse5/dist/index.js
/**
* Parses an HTML string.
*
* @param html Input HTML string.
* @param options Parsing options.
* @returns Document
*
* @example
*
* ```js
* const parse5 = require('parse5');
*
* const document = parse5.parse('<!DOCTYPE html><html><head></head><body>Hi there!</body></html>');
*
* console.log(document.childNodes[1].tagName); //> 'html'
*```
*/
function parse(html, options) {
	return Parser.parse(html, options);
}
export { ERR as ErrorCodes, parse };
