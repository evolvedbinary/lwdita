 /*!
Copyright (C) 2020 Evolved Binary

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { XditaSerializer } from '../src/xdita-serializer';
import { InMemoryTextSimpleOutputStreamCollector } from '../src/stream';

/**
 * test-utils.ts
 *
 * Provides objects and strings to mock test data, and some utility functions.
 */

export const XMLNODE_AUDIO = `{"name":"audio","attributes":{},"ns":{},"prefix":"","local":"audio","uri":"","isSelfClosing":true}`;
export const AUDIO_NODE_OBJECT = {
  "_props": {
    "props": undefined,
    "dir": undefined,
    "xml:lang": undefined,
    "translate": undefined,
    "keyref": undefined,
    "id": undefined,
    "conref": undefined,
    "outputclass": undefined,
    "class": undefined,
    "href": undefined,
    "format": undefined,
    "scope": undefined,
    "autoplay": undefined,
    "controls": undefined,
    "loop": undefined,
    "muted": undefined,
    "tabindex": undefined
  }
};
export const XMLNODE_UNKNOWN = `{"name":"unknown","attributes":{},"ns":{},"prefix":"","local":"audio","uri":"","isSelfClosing":true}`;

export const fullXditaExample = `<topic id="fullTopic"><title dir="ltr" xml:lang="english" translate="no">
        <b>bold</b> and <em>emphasized</em> and <i>italic</i> and <ph>Phrase content</ph> and <strong>strong</strong>
        and <sub>subscript</sub> and <sup>superscipt</sup> and <tt>tele type</tt> and <u>underline</u><image/>
        </title><shortdesc>Short description of the full topic.</shortdesc><prolog props="metadata"><metadata><othermeta name="test" content="test"/></metadata></prolog><body outputclass="outputclass"><p>Paragraph content</p><ul><li><p>Unordered list item</p></li></ul><ol><li><p>Ordered list item</p></li></ol><dl><dlentry><dt>Definition term</dt><dd><p>Definition description</p></dd></dlentry></dl><pre>Preformatted content</pre><audio autoplay="false" controls="true" loop="false" muted="false"><desc>Theme song for the LwDITA podcast</desc><fallback><p>The theme song is not available.</p></fallback><media-source href="theme-song.mp3"/><media-track href="theme-song.vtt" srclang="en"/></audio><video width="400px" height="300px" loop="false" muted="false"><desc>Video about the Sensei Sushi promise.</desc><fallback><image href="video-not-available.png"><alt>This video cannot be displayed.</alt></image></fallback><video-poster href="sensei-video.jpg"/><media-source href="sensei-video.mp4"/><media-source href="sensei-video.ogg"/><media-source href="sensei-video.webm"/><media-track href="sensei-video.vtt" srclang="en"/></video><example><title>title</title></example><simpletable><title>Table title</title><sthead><stentry><p>Header 1</p></stentry><stentry><p>Header 2</p></stentry></sthead><strow><stentry><p>Row 1, Cell 1</p></stentry><stentry><p>Row 1, Cell 2</p></stentry></strow><strow><stentry><p>Row 2, Cell 1</p></stentry><stentry><p>Row 2, Cell 2</p></stentry></strow></simpletable><fig><title>Figure title</title><desc>Figure description</desc><image href="images/image.png"><alt>alt text</alt></image></fig><note type="note"><p>Note content</p></note><section><title>Section title</title><p>Section content</p></section><div><fn id="footnote"/></div></body></topic>`

export const fullAstObject = {
  _children: [
    {
      _props: {
        dir: undefined,
        "xml:lang": undefined,
        translate: undefined,
        outputclass: undefined,
        class: undefined,
        specializations: undefined,
        id: "fullTopic",
        "xmlns:ditaarch": undefined,
        "ditaarch:DITAArchVersion": undefined,
      },
      _children: [
        {
          _props: {
            dir: "ltr",
            "xml:lang": "english",
            translate: "no",
            outputclass: undefined,
            class: undefined,
          },
          _children: [
            {
              _props: {
                content: "\n        ",
              },
            },
            {
              _props: {
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                keyref: undefined,
                outputclass: undefined,
                class: undefined,
              },
              _children: [
                {
                  _props: {
                    content: "bold",
                  },
                },
              ],
            },
            {
              _props: {
                content: " and ",
              },
            },
            {
              _props: {
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                keyref: undefined,
                outputclass: undefined,
                class: undefined,
              },
              _children: [
                {
                  _props: {
                    content: "emphasized",
                  },
                },
              ],
            },
            {
              _props: {
                content: " and ",
              },
            },
            {
              _props: {
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                keyref: undefined,
                outputclass: undefined,
                class: undefined,
              },
              _children: [
                {
                  _props: {
                    content: "italic",
                  },
                },
              ],
            },
            {
              _props: {
                content: " and ",
              },
            },
            {
              _props: {
                props: undefined,
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                keyref: undefined,
                outputclass: undefined,
                class: undefined,
              },
              _children: [
                {
                  _props: {
                    content: "Phrase content",
                  },
                },
              ],
            },
            {
              _props: {
                content: " and ",
              },
            },
            {
              _props: {
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                keyref: undefined,
                outputclass: undefined,
                class: undefined,
              },
              _children: [
                {
                  _props: {
                    content: "strong",
                  },
                },
              ],
            },
            {
              _props: {
                content: "\n        and ",
              },
            },
            {
              _props: {
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                keyref: undefined,
                outputclass: undefined,
                class: undefined,
              },
              _children: [
                {
                  _props: {
                    content: "subscript",
                  },
                },
              ],
            },
            {
              _props: {
                content: " and ",
              },
            },
            {
              _props: {
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                keyref: undefined,
                outputclass: undefined,
                class: undefined,
              },
              _children: [
                {
                  _props: {
                    content: "superscipt",
                  },
                },
              ],
            },
            {
              _props: {
                content: " and ",
              },
            },
            {
              _props: {
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                keyref: undefined,
                outputclass: undefined,
                class: undefined,
              },
              _children: [
                {
                  _props: {
                    content: "tele type",
                  },
                },
              ],
            },
            {
              _props: {
                content: " and ",
              },
            },
            {
              _props: {
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                keyref: undefined,
                outputclass: undefined,
                class: undefined,
              },
              _children: [
                {
                  _props: {
                    content: "underline",
                  },
                },
              ],
            },
            {
              _props: {
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                href: undefined,
                format: undefined,
                scope: undefined,
                width: undefined,
                height: undefined,
                keyref: undefined,
                outputclass: undefined,
                class: undefined,
              },
            },
            {
              _props: {
                content: "\n        ",
              },
            },
          ],
        },
        {
          _props: {
            props: undefined,
            id: undefined,
            conref: undefined,
            dir: undefined,
            "xml:lang": undefined,
            translate: undefined,
            outputclass: undefined,
            class: undefined,
          },
          _children: [
            {
              _props: {
                content: "Short description of the full topic.",
              },
            },
          ],
        },
        {
          _props: {
            props: "metadata",
            dir: undefined,
            "xml:lang": undefined,
            translate: undefined,
            outputclass: undefined,
            class: undefined,
          },
          _children: [
            {
              _props: {
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                props: undefined,
                id: undefined,
                conref: undefined,
                outputclass: undefined,
                class: undefined,
              },
              _children: [
                {
                  _props: {
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    name: "test",
                    content: "test",
                    class: undefined,
                  },
                },
              ],
            },
          ],
        },
        {
          _props: {
            dir: undefined,
            "xml:lang": undefined,
            translate: undefined,
            outputclass: "outputclass",
            class: undefined,
          },
          _children: [
            {
              _props: {
                props: undefined,
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                id: undefined,
                conref: undefined,
                outputclass: undefined,
                class: undefined,
              },
              _children: [
                {
                  _props: {
                    content: "Paragraph content",
                  },
                },
              ],
            },
            {
              _props: {
                props: undefined,
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                id: undefined,
                conref: undefined,
                outputclass: undefined,
                class: undefined,
              },
              _children: [
                {
                  _props: {
                    props: undefined,
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    id: undefined,
                    conref: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  _children: [
                    {
                      _props: {
                        props: undefined,
                        dir: undefined,
                        "xml:lang": undefined,
                        translate: undefined,
                        id: undefined,
                        conref: undefined,
                        outputclass: undefined,
                        class: undefined,
                      },
                      _children: [
                        {
                          _props: {
                            content: "Unordered list item",
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              _props: {
                props: undefined,
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                id: undefined,
                conref: undefined,
                outputclass: undefined,
                class: undefined,
              },
              _children: [
                {
                  _props: {
                    props: undefined,
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    id: undefined,
                    conref: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  _children: [
                    {
                      _props: {
                        props: undefined,
                        dir: undefined,
                        "xml:lang": undefined,
                        translate: undefined,
                        id: undefined,
                        conref: undefined,
                        outputclass: undefined,
                        class: undefined,
                      },
                      _children: [
                        {
                          _props: {
                            content: "Ordered list item",
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              _props: {
                props: undefined,
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                id: undefined,
                conref: undefined,
                outputclass: undefined,
                class: undefined,
              },
              _children: [
                {
                  _props: {
                    props: undefined,
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    id: undefined,
                    conref: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  _children: [
                    {
                      _props: {
                        props: undefined,
                        dir: undefined,
                        "xml:lang": undefined,
                        translate: undefined,
                        id: undefined,
                        conref: undefined,
                        outputclass: undefined,
                        class: undefined,
                      },
                      _children: [
                        {
                          _props: {
                            content: "Definition term",
                          },
                        },
                      ],
                    },
                    {
                      _props: {
                        props: undefined,
                        dir: undefined,
                        "xml:lang": undefined,
                        translate: undefined,
                        id: undefined,
                        conref: undefined,
                        outputclass: undefined,
                        class: undefined,
                      },
                      _children: [
                        {
                          _props: {
                            props: undefined,
                            dir: undefined,
                            "xml:lang": undefined,
                            translate: undefined,
                            id: undefined,
                            conref: undefined,
                            outputclass: undefined,
                            class: undefined,
                          },
                          _children: [
                            {
                              _props: {
                                content: "Definition description",
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              _props: {
                props: undefined,
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                id: undefined,
                conref: undefined,
                outputclass: undefined,
                class: undefined,
                "xml:space": undefined,
              },
              _children: [
                {
                  _props: {
                    content: "Preformatted content",
                  },
                },
              ],
            },
            {
              _props: {
                props: undefined,
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                id: undefined,
                conref: undefined,
                keyref: undefined,
                href: undefined,
                format: undefined,
                scope: undefined,
                outputclass: undefined,
                class: undefined,
                autoplay: "false",
                controls: "true",
                loop: "false",
                muted: "false",
                tabindex: undefined,
              },
              _children: [
                {
                  _props: {
                    props: undefined,
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  _children: [
                    {
                      _props: {
                        content: "Theme song for the LwDITA podcast",
                      },
                    },
                  ],
                },
                {
                  _props: {
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    props: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  _children: [
                    {
                      _props: {
                        props: undefined,
                        dir: undefined,
                        "xml:lang": undefined,
                        translate: undefined,
                        id: undefined,
                        conref: undefined,
                        outputclass: undefined,
                        class: undefined,
                      },
                      _children: [
                        {
                          _props: {
                            content: "The theme song is not available.",
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  _props: {
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    href: "theme-song.mp3",
                    format: undefined,
                    scope: undefined,
                    keyref: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                },
                {
                  _props: {
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    href: "theme-song.vtt",
                    format: undefined,
                    scope: undefined,
                    keyref: undefined,
                    outputclass: undefined,
                    class: undefined,
                    kind: undefined,
                    srclang: "en",
                  },
                },
              ],
            },
            {
              _props: {
                props: undefined,
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                href: undefined,
                format: undefined,
                scope: undefined,
                id: undefined,
                conref: undefined,
                outputclass: undefined,
                class: undefined,
                width: "400px",
                height: "300px",
                autoplay: undefined,
                controls: undefined,
                loop: "false",
                muted: "false",
                tabindex: undefined,
              },
              _children: [
                {
                  _props: {
                    props: undefined,
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  _children: [
                    {
                      _props: {
                        content: "Video about the Sensei Sushi promise.",
                      },
                    },
                  ],
                },
                {
                  _props: {
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    props: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  _children: [
                    {
                      _props: {
                        dir: undefined,
                        "xml:lang": undefined,
                        translate: undefined,
                        href: "video-not-available.png",
                        format: undefined,
                        scope: undefined,
                        width: undefined,
                        height: undefined,
                        keyref: undefined,
                        outputclass: undefined,
                        class: undefined,
                      },
                      _children: [
                        {
                          _props: {
                            dir: undefined,
                            "xml:lang": undefined,
                            translate: undefined,
                            keyref: undefined,
                            outputclass: undefined,
                            class: undefined,
                          },
                          _children: [
                            {
                              _props: {
                                content: "This video cannot be displayed.",
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  _props: {
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    props: undefined,
                    href: "sensei-video.jpg",
                    format: undefined,
                    scope: undefined,
                    id: undefined,
                    conref: undefined,
                    keyref: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                },
                {
                  _props: {
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    href: "sensei-video.mp4",
                    format: undefined,
                    scope: undefined,
                    keyref: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                },
                {
                  _props: {
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    href: "sensei-video.ogg",
                    format: undefined,
                    scope: undefined,
                    keyref: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                },
                {
                  _props: {
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    href: "sensei-video.webm",
                    format: undefined,
                    scope: undefined,
                    keyref: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                },
                {
                  _props: {
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    href: "sensei-video.vtt",
                    format: undefined,
                    scope: undefined,
                    keyref: undefined,
                    outputclass: undefined,
                    class: undefined,
                    kind: undefined,
                    srclang: "en",
                  },
                },
              ],
            },
            {
              _props: {
                scale: undefined,
                frame: undefined,
                expanse: undefined,
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                props: undefined,
                id: undefined,
                conref: undefined,
                outputclass: undefined,
                class: undefined,
              },
              _children: [
                {
                  _props: {
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  _children: [
                    {
                      _props: {
                        content: "title",
                      },
                    },
                  ],
                },
              ],
            },
            {
              _props: {
                props: undefined,
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                id: undefined,
                conref: undefined,
                outputclass: undefined,
                class: undefined,
              },
              _children: [
                {
                  _props: {
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  _children: [
                    {
                      _props: {
                        content: "Table title",
                      },
                    },
                  ],
                },
                {
                  _props: {
                    props: undefined,
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    id: undefined,
                    conref: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  _children: [
                    {
                      _props: {
                        props: undefined,
                        dir: undefined,
                        "xml:lang": undefined,
                        translate: undefined,
                        id: undefined,
                        conref: undefined,
                        outputclass: undefined,
                        class: undefined,
                        colspan: undefined,
                        rowspan: undefined,
                        scope: undefined,
                        headers: undefined,
                      },
                      _children: [
                        {
                          _props: {
                            props: undefined,
                            dir: undefined,
                            "xml:lang": undefined,
                            translate: undefined,
                            id: undefined,
                            conref: undefined,
                            outputclass: undefined,
                            class: undefined,
                          },
                          _children: [
                            {
                              _props: {
                                content: "Header 1",
                              },
                            },
                          ],
                        },
                      ],
                    },
                    {
                      _props: {
                        props: undefined,
                        dir: undefined,
                        "xml:lang": undefined,
                        translate: undefined,
                        id: undefined,
                        conref: undefined,
                        outputclass: undefined,
                        class: undefined,
                        colspan: undefined,
                        rowspan: undefined,
                        scope: undefined,
                        headers: undefined,
                      },
                      _children: [
                        {
                          _props: {
                            props: undefined,
                            dir: undefined,
                            "xml:lang": undefined,
                            translate: undefined,
                            id: undefined,
                            conref: undefined,
                            outputclass: undefined,
                            class: undefined,
                          },
                          _children: [
                            {
                              _props: {
                                content: "Header 2",
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  _props: {
                    props: undefined,
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    id: undefined,
                    conref: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  _children: [
                    {
                      _props: {
                        props: undefined,
                        dir: undefined,
                        "xml:lang": undefined,
                        translate: undefined,
                        id: undefined,
                        conref: undefined,
                        outputclass: undefined,
                        class: undefined,
                        colspan: undefined,
                        rowspan: undefined,
                        scope: undefined,
                        headers: undefined,
                      },
                      _children: [
                        {
                          _props: {
                            props: undefined,
                            dir: undefined,
                            "xml:lang": undefined,
                            translate: undefined,
                            id: undefined,
                            conref: undefined,
                            outputclass: undefined,
                            class: undefined,
                          },
                          _children: [
                            {
                              _props: {
                                content: "Row 1, Cell 1",
                              },
                            },
                          ],
                        },
                      ],
                    },
                    {
                      _props: {
                        props: undefined,
                        dir: undefined,
                        "xml:lang": undefined,
                        translate: undefined,
                        id: undefined,
                        conref: undefined,
                        outputclass: undefined,
                        class: undefined,
                        colspan: undefined,
                        rowspan: undefined,
                        scope: undefined,
                        headers: undefined,
                      },
                      _children: [
                        {
                          _props: {
                            props: undefined,
                            dir: undefined,
                            "xml:lang": undefined,
                            translate: undefined,
                            id: undefined,
                            conref: undefined,
                            outputclass: undefined,
                            class: undefined,
                          },
                          _children: [
                            {
                              _props: {
                                content: "Row 1, Cell 2",
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  _props: {
                    props: undefined,
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    id: undefined,
                    conref: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  _children: [
                    {
                      _props: {
                        props: undefined,
                        dir: undefined,
                        "xml:lang": undefined,
                        translate: undefined,
                        id: undefined,
                        conref: undefined,
                        outputclass: undefined,
                        class: undefined,
                        colspan: undefined,
                        rowspan: undefined,
                        scope: undefined,
                        headers: undefined,
                      },
                      _children: [
                        {
                          _props: {
                            props: undefined,
                            dir: undefined,
                            "xml:lang": undefined,
                            translate: undefined,
                            id: undefined,
                            conref: undefined,
                            outputclass: undefined,
                            class: undefined,
                          },
                          _children: [
                            {
                              _props: {
                                content: "Row 2, Cell 1",
                              },
                            },
                          ],
                        },
                      ],
                    },
                    {
                      _props: {
                        props: undefined,
                        dir: undefined,
                        "xml:lang": undefined,
                        translate: undefined,
                        id: undefined,
                        conref: undefined,
                        outputclass: undefined,
                        class: undefined,
                        colspan: undefined,
                        rowspan: undefined,
                        scope: undefined,
                        headers: undefined,
                      },
                      _children: [
                        {
                          _props: {
                            props: undefined,
                            dir: undefined,
                            "xml:lang": undefined,
                            translate: undefined,
                            id: undefined,
                            conref: undefined,
                            outputclass: undefined,
                            class: undefined,
                          },
                          _children: [
                            {
                              _props: {
                                content: "Row 2, Cell 2",
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              _props: {
                scale: undefined,
                frame: undefined,
                expanse: undefined,
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                props: undefined,
                id: undefined,
                conref: undefined,
                outputclass: undefined,
                class: undefined,
              },
              _children: [
                {
                  _props: {
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  _children: [
                    {
                      _props: {
                        content: "Figure title",
                      },
                    },
                  ],
                },
                {
                  _props: {
                    props: undefined,
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  _children: [
                    {
                      _props: {
                        content: "Figure description",
                      },
                    },
                  ],
                },
                {
                  _props: {
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    href: "images/image.png",
                    format: undefined,
                    scope: undefined,
                    width: undefined,
                    height: undefined,
                    keyref: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  _children: [
                    {
                      _props: {
                        dir: undefined,
                        "xml:lang": undefined,
                        translate: undefined,
                        keyref: undefined,
                        outputclass: undefined,
                        class: undefined,
                      },
                      _children: [
                        {
                          _props: {
                            content: "alt text",
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              _props: {
                props: undefined,
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                id: undefined,
                conref: undefined,
                outputclass: undefined,
                class: undefined,
                type: "note",
              },
              _children: [
                {
                  _props: {
                    props: undefined,
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    id: undefined,
                    conref: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  _children: [
                    {
                      _props: {
                        content: "Note content",
                      },
                    },
                  ],
                },
              ],
            },
            {
              _props: {
                props: undefined,
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                id: undefined,
                conref: undefined,
                outputclass: undefined,
                class: undefined,
              },
              _children: [
                {
                  _props: {
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  _children: [
                    {
                      _props: {
                        content: "Section title",
                      },
                    },
                  ],
                },
                {
                  _props: {
                    props: undefined,
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    id: undefined,
                    conref: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  _children: [
                    {
                      _props: {
                        content: "Section content",
                      },
                    },
                  ],
                },
              ],
            },
            {
              _props: {
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                props: undefined,
                outputclass: undefined,
                class: undefined,
              },
              _children: [
                {
                  _props: {
                    props: undefined,
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    conref: undefined,
                    outputclass: undefined,
                    class: undefined,
                    id: "footnote",
                    callout: undefined,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const fullJditaObject = {
  nodeName: "document",
  attributes: undefined,
  children: [
    {
      nodeName: "topic",
      attributes: {
        dir: undefined,
        "xml:lang": undefined,
        translate: undefined,
        outputclass: undefined,
        class: undefined,
        specializations: undefined,
        id: "fullTopic",
        "xmlns:ditaarch": undefined,
        "ditaarch:DITAArchVersion": undefined,
      },
      children: [
        {
          nodeName: "title",
          attributes: {
            dir: "ltr",
            "xml:lang": "english",
            translate: "no",
            outputclass: undefined,
            class: undefined,
          },
          children: [
            {
              nodeName: "text",
              content: "\n        ",
            },
            {
              nodeName: "b",
              attributes: {
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                keyref: undefined,
                outputclass: undefined,
                class: undefined,
              },
              children: [
                {
                  nodeName: "text",
                  content: "bold",
                },
              ],
            },
            {
              nodeName: "text",
              content: " and ",
            },
            {
              nodeName: "em",
              attributes: {
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                keyref: undefined,
                outputclass: undefined,
                class: undefined,
              },
              children: [
                {
                  nodeName: "text",
                  content: "emphasized",
                },
              ],
            },
            {
              nodeName: "text",
              content: " and ",
            },
            {
              nodeName: "i",
              attributes: {
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                keyref: undefined,
                outputclass: undefined,
                class: undefined,
              },
              children: [
                {
                  nodeName: "text",
                  content: "italic",
                },
              ],
            },
            {
              nodeName: "text",
              content: " and ",
            },
            {
              nodeName: "ph",
              attributes: {
                props: undefined,
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                keyref: undefined,
                outputclass: undefined,
                class: undefined,
              },
              children: [
                {
                  nodeName: "text",
                  content: "Phrase content",
                },
              ],
            },
            {
              nodeName: "text",
              content: " and ",
            },
            {
              nodeName: "strong",
              attributes: {
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                keyref: undefined,
                outputclass: undefined,
                class: undefined,
              },
              children: [
                {
                  nodeName: "text",
                  content: "strong",
                },
              ],
            },
            {
              nodeName: "text",
              content: "\n        and ",
            },
            {
              nodeName: "sub",
              attributes: {
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                keyref: undefined,
                outputclass: undefined,
                class: undefined,
              },
              children: [
                {
                  nodeName: "text",
                  content: "subscript",
                },
              ],
            },
            {
              nodeName: "text",
              content: " and ",
            },
            {
              nodeName: "sup",
              attributes: {
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                keyref: undefined,
                outputclass: undefined,
                class: undefined,
              },
              children: [
                {
                  nodeName: "text",
                  content: "superscipt",
                },
              ],
            },
            {
              nodeName: "text",
              content: " and ",
            },
            {
              nodeName: "tt",
              attributes: {
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                keyref: undefined,
                outputclass: undefined,
                class: undefined,
              },
              children: [
                {
                  nodeName: "text",
                  content: "tele type",
                },
              ],
            },
            {
              nodeName: "text",
              content: " and ",
            },
            {
              nodeName: "u",
              attributes: {
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                keyref: undefined,
                outputclass: undefined,
                class: undefined,
              },
              children: [
                {
                  nodeName: "text",
                  content: "underline",
                },
              ],
            },
            {
              nodeName: "image",
              attributes: {
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                href: undefined,
                format: undefined,
                scope: undefined,
                width: undefined,
                height: undefined,
                keyref: undefined,
                outputclass: undefined,
                class: undefined,
              },
              children: undefined,
            },
            {
              nodeName: "text",
              content: "\n        ",
            },
          ],
        },
        {
          nodeName: "shortdesc",
          attributes: {
            props: undefined,
            id: undefined,
            conref: undefined,
            dir: undefined,
            "xml:lang": undefined,
            translate: undefined,
            outputclass: undefined,
            class: undefined,
          },
          children: [
            {
              nodeName: "text",
              content: "Short description of the full topic.",
            },
          ],
        },
        {
          nodeName: "prolog",
          attributes: {
            props: "metadata",
            dir: undefined,
            "xml:lang": undefined,
            translate: undefined,
            outputclass: undefined,
            class: undefined,
          },
          children: [
            {
              nodeName: "metadata",
              attributes: {
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                props: undefined,
                id: undefined,
                conref: undefined,
                outputclass: undefined,
                class: undefined,
              },
              children: [
                {
                  nodeName: "othermeta",
                  attributes: {
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    name: "test",
                    content: "test",
                    class: undefined,
                  },
                  children: undefined,
                },
              ],
            },
          ],
        },
        {
          nodeName: "body",
          attributes: {
            dir: undefined,
            "xml:lang": undefined,
            translate: undefined,
            outputclass: "outputclass",
            class: undefined,
          },
          children: [
            {
              nodeName: "p",
              attributes: {
                props: undefined,
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                id: undefined,
                conref: undefined,
                outputclass: undefined,
                class: undefined,
              },
              children: [
                {
                  nodeName: "text",
                  content: "Paragraph content",
                },
              ],
            },
            {
              nodeName: "ul",
              attributes: {
                props: undefined,
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                id: undefined,
                conref: undefined,
                outputclass: undefined,
                class: undefined,
              },
              children: [
                {
                  nodeName: "li",
                  attributes: {
                    props: undefined,
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    id: undefined,
                    conref: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  children: [
                    {
                      nodeName: "p",
                      attributes: {
                        props: undefined,
                        dir: undefined,
                        "xml:lang": undefined,
                        translate: undefined,
                        id: undefined,
                        conref: undefined,
                        outputclass: undefined,
                        class: undefined,
                      },
                      children: [
                        {
                          nodeName: "text",
                          content: "Unordered list item",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              nodeName: "ol",
              attributes: {
                props: undefined,
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                id: undefined,
                conref: undefined,
                outputclass: undefined,
                class: undefined,
              },
              children: [
                {
                  nodeName: "li",
                  attributes: {
                    props: undefined,
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    id: undefined,
                    conref: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  children: [
                    {
                      nodeName: "p",
                      attributes: {
                        props: undefined,
                        dir: undefined,
                        "xml:lang": undefined,
                        translate: undefined,
                        id: undefined,
                        conref: undefined,
                        outputclass: undefined,
                        class: undefined,
                      },
                      children: [
                        {
                          nodeName: "text",
                          content: "Ordered list item",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              nodeName: "dl",
              attributes: {
                props: undefined,
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                id: undefined,
                conref: undefined,
                outputclass: undefined,
                class: undefined,
              },
              children: [
                {
                  nodeName: "dlentry",
                  attributes: {
                    props: undefined,
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    id: undefined,
                    conref: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  children: [
                    {
                      nodeName: "dt",
                      attributes: {
                        props: undefined,
                        dir: undefined,
                        "xml:lang": undefined,
                        translate: undefined,
                        id: undefined,
                        conref: undefined,
                        outputclass: undefined,
                        class: undefined,
                      },
                      children: [
                        {
                          nodeName: "text",
                          content: "Definition term",
                        },
                      ],
                    },
                    {
                      nodeName: "dd",
                      attributes: {
                        props: undefined,
                        dir: undefined,
                        "xml:lang": undefined,
                        translate: undefined,
                        id: undefined,
                        conref: undefined,
                        outputclass: undefined,
                        class: undefined,
                      },
                      children: [
                        {
                          nodeName: "p",
                          attributes: {
                            props: undefined,
                            dir: undefined,
                            "xml:lang": undefined,
                            translate: undefined,
                            id: undefined,
                            conref: undefined,
                            outputclass: undefined,
                            class: undefined,
                          },
                          children: [
                            {
                              nodeName: "text",
                              content: "Definition description",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              nodeName: "pre",
              attributes: {
                props: undefined,
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                id: undefined,
                conref: undefined,
                outputclass: undefined,
                class: undefined,
                "xml:space": undefined,
              },
              children: [
                {
                  nodeName: "text",
                  content: "Preformatted content",
                },
              ],
            },
            {
              nodeName: "audio",
              attributes: {
                props: undefined,
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                id: undefined,
                conref: undefined,
                keyref: undefined,
                href: undefined,
                format: undefined,
                scope: undefined,
                outputclass: undefined,
                class: undefined,
                autoplay: "false",
                controls: "true",
                loop: "false",
                muted: "false",
                tabindex: undefined,
              },
              children: [
                {
                  nodeName: "desc",
                  attributes: {
                    props: undefined,
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  children: [
                    {
                      nodeName: "text",
                      content: "Theme song for the LwDITA podcast",
                    },
                  ],
                },
                {
                  nodeName: "fallback",
                  attributes: {
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    props: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  children: [
                    {
                      nodeName: "p",
                      attributes: {
                        props: undefined,
                        dir: undefined,
                        "xml:lang": undefined,
                        translate: undefined,
                        id: undefined,
                        conref: undefined,
                        outputclass: undefined,
                        class: undefined,
                      },
                      children: [
                        {
                          nodeName: "text",
                          content: "The theme song is not available.",
                        },
                      ],
                    },
                  ],
                },
                {
                  nodeName: "media-source",
                  attributes: {
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    href: "theme-song.mp3",
                    format: undefined,
                    scope: undefined,
                    keyref: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  children: undefined,
                },
                {
                  nodeName: "media-track",
                  attributes: {
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    href: "theme-song.vtt",
                    format: undefined,
                    scope: undefined,
                    keyref: undefined,
                    outputclass: undefined,
                    class: undefined,
                    kind: undefined,
                    srclang: "en",
                  },
                  children: undefined,
                },
              ],
            },
            {
              nodeName: "video",
              attributes: {
                props: undefined,
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                href: undefined,
                format: undefined,
                scope: undefined,
                id: undefined,
                conref: undefined,
                outputclass: undefined,
                class: undefined,
                width: "400px",
                height: "300px",
                autoplay: undefined,
                controls: undefined,
                loop: "false",
                muted: "false",
                tabindex: undefined,
              },
              children: [
                {
                  nodeName: "desc",
                  attributes: {
                    props: undefined,
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  children: [
                    {
                      nodeName: "text",
                      content: "Video about the Sensei Sushi promise.",
                    },
                  ],
                },
                {
                  nodeName: "fallback",
                  attributes: {
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    props: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  children: [
                    {
                      nodeName: "image",
                      attributes: {
                        dir: undefined,
                        "xml:lang": undefined,
                        translate: undefined,
                        href: "video-not-available.png",
                        format: undefined,
                        scope: undefined,
                        width: undefined,
                        height: undefined,
                        keyref: undefined,
                        outputclass: undefined,
                        class: undefined,
                      },
                      children: [
                        {
                          nodeName: "alt",
                          attributes: {
                            dir: undefined,
                            "xml:lang": undefined,
                            translate: undefined,
                            keyref: undefined,
                            outputclass: undefined,
                            class: undefined,
                          },
                          children: [
                            {
                              nodeName: "text",
                              content: "This video cannot be displayed.",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  nodeName: "video-poster",
                  attributes: {
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    props: undefined,
                    href: "sensei-video.jpg",
                    format: undefined,
                    scope: undefined,
                    id: undefined,
                    conref: undefined,
                    keyref: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  children: undefined,
                },
                {
                  nodeName: "media-source",
                  attributes: {
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    href: "sensei-video.mp4",
                    format: undefined,
                    scope: undefined,
                    keyref: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  children: undefined,
                },
                {
                  nodeName: "media-source",
                  attributes: {
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    href: "sensei-video.ogg",
                    format: undefined,
                    scope: undefined,
                    keyref: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  children: undefined,
                },
                {
                  nodeName: "media-source",
                  attributes: {
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    href: "sensei-video.webm",
                    format: undefined,
                    scope: undefined,
                    keyref: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  children: undefined,
                },
                {
                  nodeName: "media-track",
                  attributes: {
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    href: "sensei-video.vtt",
                    format: undefined,
                    scope: undefined,
                    keyref: undefined,
                    outputclass: undefined,
                    class: undefined,
                    kind: undefined,
                    srclang: "en",
                  },
                  children: undefined,
                },
              ],
            },
            {
              nodeName: "example",
              attributes: {
                scale: undefined,
                frame: undefined,
                expanse: undefined,
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                props: undefined,
                id: undefined,
                conref: undefined,
                outputclass: undefined,
                class: undefined,
              },
              children: [
                {
                  nodeName: "title",
                  attributes: {
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  children: [
                    {
                      nodeName: "text",
                      content: "title",
                    },
                  ],
                },
              ],
            },
            {
              nodeName: "simpletable",
              attributes: {
                props: undefined,
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                id: undefined,
                conref: undefined,
                outputclass: undefined,
                class: undefined,
              },
              children: [
                {
                  nodeName: "title",
                  attributes: {
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  children: [
                    {
                      nodeName: "text",
                      content: "Table title",
                    },
                  ],
                },
                {
                  nodeName: "sthead",
                  attributes: {
                    props: undefined,
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    id: undefined,
                    conref: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  children: [
                    {
                      nodeName: "stentry",
                      attributes: {
                        props: undefined,
                        dir: undefined,
                        "xml:lang": undefined,
                        translate: undefined,
                        id: undefined,
                        conref: undefined,
                        outputclass: undefined,
                        class: undefined,
                        colspan: undefined,
                        rowspan: undefined,
                        scope: undefined,
                        headers: undefined,
                      },
                      children: [
                        {
                          nodeName: "p",
                          attributes: {
                            props: undefined,
                            dir: undefined,
                            "xml:lang": undefined,
                            translate: undefined,
                            id: undefined,
                            conref: undefined,
                            outputclass: undefined,
                            class: undefined,
                          },
                          children: [
                            {
                              nodeName: "text",
                              content: "Header 1",
                            },
                          ],
                        },
                      ],
                    },
                    {
                      nodeName: "stentry",
                      attributes: {
                        props: undefined,
                        dir: undefined,
                        "xml:lang": undefined,
                        translate: undefined,
                        id: undefined,
                        conref: undefined,
                        outputclass: undefined,
                        class: undefined,
                        colspan: undefined,
                        rowspan: undefined,
                        scope: undefined,
                        headers: undefined,
                      },
                      children: [
                        {
                          nodeName: "p",
                          attributes: {
                            props: undefined,
                            dir: undefined,
                            "xml:lang": undefined,
                            translate: undefined,
                            id: undefined,
                            conref: undefined,
                            outputclass: undefined,
                            class: undefined,
                          },
                          children: [
                            {
                              nodeName: "text",
                              content: "Header 2",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  nodeName: "strow",
                  attributes: {
                    props: undefined,
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    id: undefined,
                    conref: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  children: [
                    {
                      nodeName: "stentry",
                      attributes: {
                        props: undefined,
                        dir: undefined,
                        "xml:lang": undefined,
                        translate: undefined,
                        id: undefined,
                        conref: undefined,
                        outputclass: undefined,
                        class: undefined,
                        colspan: undefined,
                        rowspan: undefined,
                        scope: undefined,
                        headers: undefined,
                      },
                      children: [
                        {
                          nodeName: "p",
                          attributes: {
                            props: undefined,
                            dir: undefined,
                            "xml:lang": undefined,
                            translate: undefined,
                            id: undefined,
                            conref: undefined,
                            outputclass: undefined,
                            class: undefined,
                          },
                          children: [
                            {
                              nodeName: "text",
                              content: "Row 1, Cell 1",
                            },
                          ],
                        },
                      ],
                    },
                    {
                      nodeName: "stentry",
                      attributes: {
                        props: undefined,
                        dir: undefined,
                        "xml:lang": undefined,
                        translate: undefined,
                        id: undefined,
                        conref: undefined,
                        outputclass: undefined,
                        class: undefined,
                        colspan: undefined,
                        rowspan: undefined,
                        scope: undefined,
                        headers: undefined,
                      },
                      children: [
                        {
                          nodeName: "p",
                          attributes: {
                            props: undefined,
                            dir: undefined,
                            "xml:lang": undefined,
                            translate: undefined,
                            id: undefined,
                            conref: undefined,
                            outputclass: undefined,
                            class: undefined,
                          },
                          children: [
                            {
                              nodeName: "text",
                              content: "Row 1, Cell 2",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  nodeName: "strow",
                  attributes: {
                    props: undefined,
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    id: undefined,
                    conref: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  children: [
                    {
                      nodeName: "stentry",
                      attributes: {
                        props: undefined,
                        dir: undefined,
                        "xml:lang": undefined,
                        translate: undefined,
                        id: undefined,
                        conref: undefined,
                        outputclass: undefined,
                        class: undefined,
                        colspan: undefined,
                        rowspan: undefined,
                        scope: undefined,
                        headers: undefined,
                      },
                      children: [
                        {
                          nodeName: "p",
                          attributes: {
                            props: undefined,
                            dir: undefined,
                            "xml:lang": undefined,
                            translate: undefined,
                            id: undefined,
                            conref: undefined,
                            outputclass: undefined,
                            class: undefined,
                          },
                          children: [
                            {
                              nodeName: "text",
                              content: "Row 2, Cell 1",
                            },
                          ],
                        },
                      ],
                    },
                    {
                      nodeName: "stentry",
                      attributes: {
                        props: undefined,
                        dir: undefined,
                        "xml:lang": undefined,
                        translate: undefined,
                        id: undefined,
                        conref: undefined,
                        outputclass: undefined,
                        class: undefined,
                        colspan: undefined,
                        rowspan: undefined,
                        scope: undefined,
                        headers: undefined,
                      },
                      children: [
                        {
                          nodeName: "p",
                          attributes: {
                            props: undefined,
                            dir: undefined,
                            "xml:lang": undefined,
                            translate: undefined,
                            id: undefined,
                            conref: undefined,
                            outputclass: undefined,
                            class: undefined,
                          },
                          children: [
                            {
                              nodeName: "text",
                              content: "Row 2, Cell 2",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              nodeName: "fig",
              attributes: {
                scale: undefined,
                frame: undefined,
                expanse: undefined,
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                props: undefined,
                id: undefined,
                conref: undefined,
                outputclass: undefined,
                class: undefined,
              },
              children: [
                {
                  nodeName: "title",
                  attributes: {
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  children: [
                    {
                      nodeName: "text",
                      content: "Figure title",
                    },
                  ],
                },
                {
                  nodeName: "desc",
                  attributes: {
                    props: undefined,
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  children: [
                    {
                      nodeName: "text",
                      content: "Figure description",
                    },
                  ],
                },
                {
                  nodeName: "image",
                  attributes: {
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    href: "images/image.png",
                    format: undefined,
                    scope: undefined,
                    width: undefined,
                    height: undefined,
                    keyref: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  children: [
                    {
                      nodeName: "alt",
                      attributes: {
                        dir: undefined,
                        "xml:lang": undefined,
                        translate: undefined,
                        keyref: undefined,
                        outputclass: undefined,
                        class: undefined,
                      },
                      children: [
                        {
                          nodeName: "text",
                          content: "alt text",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              nodeName: "note",
              attributes: {
                props: undefined,
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                id: undefined,
                conref: undefined,
                outputclass: undefined,
                class: undefined,
                type: "note",
              },
              children: [
                {
                  nodeName: "p",
                  attributes: {
                    props: undefined,
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    id: undefined,
                    conref: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  children: [
                    {
                      nodeName: "text",
                      content: "Note content",
                    },
                  ],
                },
              ],
            },
            {
              nodeName: "section",
              attributes: {
                props: undefined,
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                id: undefined,
                conref: undefined,
                outputclass: undefined,
                class: undefined,
              },
              children: [
                {
                  nodeName: "title",
                  attributes: {
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  children: [
                    {
                      nodeName: "text",
                      content: "Section title",
                    },
                  ],
                },
                {
                  nodeName: "p",
                  attributes: {
                    props: undefined,
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    id: undefined,
                    conref: undefined,
                    outputclass: undefined,
                    class: undefined,
                  },
                  children: [
                    {
                      nodeName: "text",
                      content: "Section content",
                    },
                  ],
                },
              ],
            },
            {
              nodeName: "div",
              attributes: {
                dir: undefined,
                "xml:lang": undefined,
                translate: undefined,
                props: undefined,
                outputclass: undefined,
                class: undefined,
              },
              children: [
                {
                  nodeName: "fn",
                  attributes: {
                    props: undefined,
                    dir: undefined,
                    "xml:lang": undefined,
                    translate: undefined,
                    conref: undefined,
                    outputclass: undefined,
                    class: undefined,
                    id: "footnote",
                    callout: undefined,
                  },
                  children: undefined,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

/**
 * Construct a new Serializer and OutputStream for testing.
 *
 * @param indent - enable indentation
 * @param indentation - the character (or string) to use as the indent
 * @param tabSize - size of the tab, only used when the `indentation` is not a `\t` character.
 *
 * @return serializer and output stream.
 */
export function newSerializer(indent = false, indentation = " ", tabSize = 4): {serializer: XditaSerializer, outStream: InMemoryTextSimpleOutputStreamCollector} {
  const outStream = new InMemoryTextSimpleOutputStreamCollector();
  const serializer = new XditaSerializer(outStream, indent, indentation, tabSize);
  return {serializer, outStream};
}
