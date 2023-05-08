
var boxtoc =  document.querySelector(".toc_sidebar");

if (typeof(boxtoc) != 'undefined' && boxtoc != null)
{
    class TableOfContents {
        /*
            The parameters from and to must be Element objects in the DOM.
        */
        constructor({ from, to }) {
            this.fromElement = from;
            this.toElement = to;
            // Get all the ordered headings.
            this.headingElements = this.fromElement.querySelectorAll("h1, h2, h3");
            this.tocElement = document.createElement("div");
        }

        /*
            Get the most important heading level.
            For example if the article has only <h2>, <h3> and <h4> tags
            this method will return 2.
        */
        getMostImportantHeadingLevel() {
            let mostImportantHeadingLevel = 6; // <h6> heading level
            for (let i = 0; i < this.headingElements.length; i++) {
                let headingLevel = TableOfContents.getHeadingLevel(this.headingElements[i]);
                mostImportantHeadingLevel = (headingLevel < mostImportantHeadingLevel) ?
                    headingLevel : mostImportantHeadingLevel;
            }
            return mostImportantHeadingLevel;
        }

        /*
            Generate a unique id string for the heading from its text content.
        */
        static generateId(headingElement) {
            return headingElement.textContent.replace(/\s+/g, "_").replace(/\./g, "");
        }

        /*
            Convert <h1> to 1 … <h6> to 6.
        */
        static getHeadingLevel(headingElement) {
            switch (headingElement.tagName.toLowerCase()) {
                case "h1": return 1;
                case "h2": return 2;
                case "h3": return 3;
              //   case "h4": return 4;
              //   case "h5": return 5;
              //   case "h6": return 6;
                default: return 1;
            }
        }

        generateToc() {
            let currentLevel = this.getMostImportantHeadingLevel() - 1,
                currentElement = this.tocElement;

            for (let i = 0; i < this.headingElements.length; i++) {
                let headingElement = this.headingElements[i],
                    headingLevel = TableOfContents.getHeadingLevel(headingElement),
                    headingLevelDifference = headingLevel - currentLevel,
                    linkElement = document.createElement("a");
                    linkElement.className = 'sub-item__link';
                    // linkElement.setAttribute("onclick", "lnkSmthScroll()");

                if (!headingElement.id) {
                    headingElement.id = TableOfContents.generateId(headingElement);
                }
                linkElement.href = `#${headingElement.id}`;
                linkElement.textContent = headingElement.textContent;

                if (headingLevelDifference > 0) {
                    // Go down the DOM by adding list elements.
                    for (let j = 0; j < headingLevelDifference; j++) {
                        let listElement = document.createElement("ul"),
                            listItemElement = document.createElement("li");
                        listElement.appendChild(listItemElement);
                        currentElement.appendChild(listElement);
                        currentElement = listItemElement;
                    }
                    currentElement.appendChild(linkElement);
                } else {
                    // Go up the DOM.
                    for (let j = 0; j < -headingLevelDifference; j++) {
                        currentElement = currentElement.parentNode.parentNode;
                    }
                    let listItemElement = document.createElement("li");
                    listItemElement.appendChild(linkElement);
                    currentElement.parentNode.appendChild(listItemElement);
                    currentElement = listItemElement;
                }

                currentLevel = headingLevel;
            }

            this.toElement.appendChild(this.tocElement.firstChild);
        }
      }


      document.addEventListener("DOMContentLoaded", () =>
          new TableOfContents({
              from: document.querySelector(".single-article_content"),
              to: document.querySelector(".toc_sidebar")
          }).generateToc()
      );
}




//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ0b2MuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcbnZhciBib3h0b2MgPSAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2Nfc2lkZWJhclwiKTtcclxuXHJcbmlmICh0eXBlb2YoYm94dG9jKSAhPSAndW5kZWZpbmVkJyAmJiBib3h0b2MgIT0gbnVsbClcclxue1xyXG4gICAgY2xhc3MgVGFibGVPZkNvbnRlbnRzIHtcclxuICAgICAgICAvKlxyXG4gICAgICAgICAgICBUaGUgcGFyYW1ldGVycyBmcm9tIGFuZCB0byBtdXN0IGJlIEVsZW1lbnQgb2JqZWN0cyBpbiB0aGUgRE9NLlxyXG4gICAgICAgICovXHJcbiAgICAgICAgY29uc3RydWN0b3IoeyBmcm9tLCB0byB9KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZnJvbUVsZW1lbnQgPSBmcm9tO1xyXG4gICAgICAgICAgICB0aGlzLnRvRWxlbWVudCA9IHRvO1xyXG4gICAgICAgICAgICAvLyBHZXQgYWxsIHRoZSBvcmRlcmVkIGhlYWRpbmdzLlxyXG4gICAgICAgICAgICB0aGlzLmhlYWRpbmdFbGVtZW50cyA9IHRoaXMuZnJvbUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcImgxLCBoMiwgaDNcIik7XHJcbiAgICAgICAgICAgIHRoaXMudG9jRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgICAgICBHZXQgdGhlIG1vc3QgaW1wb3J0YW50IGhlYWRpbmcgbGV2ZWwuXHJcbiAgICAgICAgICAgIEZvciBleGFtcGxlIGlmIHRoZSBhcnRpY2xlIGhhcyBvbmx5IDxoMj4sIDxoMz4gYW5kIDxoND4gdGFnc1xyXG4gICAgICAgICAgICB0aGlzIG1ldGhvZCB3aWxsIHJldHVybiAyLlxyXG4gICAgICAgICovXHJcbiAgICAgICAgZ2V0TW9zdEltcG9ydGFudEhlYWRpbmdMZXZlbCgpIHtcclxuICAgICAgICAgICAgbGV0IG1vc3RJbXBvcnRhbnRIZWFkaW5nTGV2ZWwgPSA2OyAvLyA8aDY+IGhlYWRpbmcgbGV2ZWxcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmhlYWRpbmdFbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGhlYWRpbmdMZXZlbCA9IFRhYmxlT2ZDb250ZW50cy5nZXRIZWFkaW5nTGV2ZWwodGhpcy5oZWFkaW5nRWxlbWVudHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgbW9zdEltcG9ydGFudEhlYWRpbmdMZXZlbCA9IChoZWFkaW5nTGV2ZWwgPCBtb3N0SW1wb3J0YW50SGVhZGluZ0xldmVsKSA/XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGluZ0xldmVsIDogbW9zdEltcG9ydGFudEhlYWRpbmdMZXZlbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbW9zdEltcG9ydGFudEhlYWRpbmdMZXZlbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICAgIEdlbmVyYXRlIGEgdW5pcXVlIGlkIHN0cmluZyBmb3IgdGhlIGhlYWRpbmcgZnJvbSBpdHMgdGV4dCBjb250ZW50LlxyXG4gICAgICAgICovXHJcbiAgICAgICAgc3RhdGljIGdlbmVyYXRlSWQoaGVhZGluZ0VsZW1lbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGhlYWRpbmdFbGVtZW50LnRleHRDb250ZW50LnJlcGxhY2UoL1xccysvZywgXCJfXCIpLnJlcGxhY2UoL1xcLi9nLCBcIlwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICAgIENvbnZlcnQgPGgxPiB0byAxIOKApiA8aDY+IHRvIDYuXHJcbiAgICAgICAgKi9cclxuICAgICAgICBzdGF0aWMgZ2V0SGVhZGluZ0xldmVsKGhlYWRpbmdFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoaGVhZGluZ0VsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiaDFcIjogcmV0dXJuIDE7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiaDJcIjogcmV0dXJuIDI7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiaDNcIjogcmV0dXJuIDM7XHJcbiAgICAgICAgICAgICAgLy8gICBjYXNlIFwiaDRcIjogcmV0dXJuIDQ7XHJcbiAgICAgICAgICAgICAgLy8gICBjYXNlIFwiaDVcIjogcmV0dXJuIDU7XHJcbiAgICAgICAgICAgICAgLy8gICBjYXNlIFwiaDZcIjogcmV0dXJuIDY7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2VuZXJhdGVUb2MoKSB7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50TGV2ZWwgPSB0aGlzLmdldE1vc3RJbXBvcnRhbnRIZWFkaW5nTGV2ZWwoKSAtIDEsXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50RWxlbWVudCA9IHRoaXMudG9jRWxlbWVudDtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5oZWFkaW5nRWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBoZWFkaW5nRWxlbWVudCA9IHRoaXMuaGVhZGluZ0VsZW1lbnRzW2ldLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRpbmdMZXZlbCA9IFRhYmxlT2ZDb250ZW50cy5nZXRIZWFkaW5nTGV2ZWwoaGVhZGluZ0VsZW1lbnQpLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRpbmdMZXZlbERpZmZlcmVuY2UgPSBoZWFkaW5nTGV2ZWwgLSBjdXJyZW50TGV2ZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgbGlua0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBsaW5rRWxlbWVudC5jbGFzc05hbWUgPSAnc3ViLWl0ZW1fX2xpbmsnO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxpbmtFbGVtZW50LnNldEF0dHJpYnV0ZShcIm9uY2xpY2tcIiwgXCJsbmtTbXRoU2Nyb2xsKClcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFoZWFkaW5nRWxlbWVudC5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRpbmdFbGVtZW50LmlkID0gVGFibGVPZkNvbnRlbnRzLmdlbmVyYXRlSWQoaGVhZGluZ0VsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGlua0VsZW1lbnQuaHJlZiA9IGAjJHtoZWFkaW5nRWxlbWVudC5pZH1gO1xyXG4gICAgICAgICAgICAgICAgbGlua0VsZW1lbnQudGV4dENvbnRlbnQgPSBoZWFkaW5nRWxlbWVudC50ZXh0Q29udGVudDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaGVhZGluZ0xldmVsRGlmZmVyZW5jZSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBHbyBkb3duIHRoZSBET00gYnkgYWRkaW5nIGxpc3QgZWxlbWVudHMuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBoZWFkaW5nTGV2ZWxEaWZmZXJlbmNlOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxpc3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdEl0ZW1FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0RWxlbWVudC5hcHBlbmRDaGlsZChsaXN0SXRlbUVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50RWxlbWVudC5hcHBlbmRDaGlsZChsaXN0RWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50ID0gbGlzdEl0ZW1FbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50RWxlbWVudC5hcHBlbmRDaGlsZChsaW5rRWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEdvIHVwIHRoZSBET00uXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAtaGVhZGluZ0xldmVsRGlmZmVyZW5jZTsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50ID0gY3VycmVudEVsZW1lbnQucGFyZW50Tm9kZS5wYXJlbnROb2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGlzdEl0ZW1FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxpc3RJdGVtRWxlbWVudC5hcHBlbmRDaGlsZChsaW5rRWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEVsZW1lbnQucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChsaXN0SXRlbUVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50ID0gbGlzdEl0ZW1FbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGN1cnJlbnRMZXZlbCA9IGhlYWRpbmdMZXZlbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy50b0VsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy50b2NFbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+XHJcbiAgICAgICAgICBuZXcgVGFibGVPZkNvbnRlbnRzKHtcclxuICAgICAgICAgICAgICBmcm9tOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpbmdsZS1hcnRpY2xlX2NvbnRlbnRcIiksXHJcbiAgICAgICAgICAgICAgdG86IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9jX3NpZGViYXJcIilcclxuICAgICAgICAgIH0pLmdlbmVyYXRlVG9jKClcclxuICAgICAgKTtcclxufVxyXG5cclxuXHJcblxyXG4iXSwiZmlsZSI6InRvYy5qcyJ9

//# sourceMappingURL=toc.js.map
