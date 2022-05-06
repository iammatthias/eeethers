//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import './SVG.sol';
import './Utils.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/utils/Base64.sol';

contract Renderer {
  function render(uint256 _tokenId, string memory _a)
    public
    pure
    returns (string memory)
  {
    string[7] memory colors = [
      string.concat('ff', utils.getSlice(3, 6, _a)),
      utils.getSlice(7, 12, _a),
      utils.getSlice(13, 18, _a),
      utils.getSlice(19, 24, _a),
      utils.getSlice(25, 30, _a),
      utils.getSlice(31, 36, _a),
      utils.getSlice(37, 42, _a)
    ];

    string memory image = _render(_tokenId, colors);

    return
      string.concat(
        'data:application/json;base64,',
        Base64.encode(
          bytes(
            getEeethersJSON(
              name(_tokenId),
              // image data
              Base64.encode(bytes(image)),
              attributes(colors, _tokenId)
            )
          )
        )
      );
  }

  function _render(uint256 _tokenId, string[7] memory colors)
    internal
    pure
    returns (string memory)
  {
    return
      string.concat(
        '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1000 1000" style="background: #F2F3F5;">',
        svg.el(
          'filter',
          string.concat(svg.prop('id', 'filter')),
          string.concat(
            svg.el(
              'feTurbulence',
              string.concat(
                svg.prop('type', 'fractalNoise'),
                svg.prop('baseFrequency', '0.01'),
                svg.prop('numOctaves', '3'),
                svg.prop('seed', utils.uint2str(_tokenId))
              )
            ),
            svg.el(
              'feDisplacementMap',
              string.concat(
                svg.prop('in', 'SourceGraphic'),
                svg.prop('yChannelSelector', 'R'),
                svg.prop('scale', '99')
              )
            )
          )
        ),
        svg.g(
          string.concat(
            svg.prop('filter', 'url(#filter)'),
            svg.prop('fill', 'none'),
            svg.prop('stroke', string.concat('#ff', colors[0])),
            svg.prop('stroke-width', '140%'),
            svg.prop('stroke-dasharray', '99')
          ),
          dashArray(colors)
        ),
        '</svg>'
      );
  }

  function dashArray(string[7] memory colors)
    internal
    pure
    returns (string memory)
  {
    return
      string.concat(
        svg.circle(
          string.concat(
            svg.prop('id', 'c'),
            svg.prop('cx', '50%'),
            svg.prop('cy', '50%'),
            svg.prop('r', '70%'),
            svg.prop('style', 'transform-origin: center')
          ),
          svg.animateTransform(
            string.concat(
              svg.prop('attributeName', 'transform'),
              svg.prop('attributeType', 'XML'),
              svg.prop('type', 'rotate'),
              svg.prop('from', '0 0 0'),
              svg.prop('to', '360 0 0'),
              svg.prop('dur', '120s'),
              svg.prop('repeatCount', 'indefinite')
            )
          )
        ),
        string.concat(
          svg.el(
            'use',
            string.concat(
              svg.prop('href', '#c'),
              svg.prop('stroke', string.concat('#', colors[1])),
              svg.prop('stroke-dasharray', '99 60')
            )
          ),
          svg.el(
            'use',
            string.concat(
              svg.prop('href', '#c'),
              svg.prop('stroke', string.concat('#', colors[2])),
              svg.prop('stroke-dasharray', '99 120')
            )
          ),
          svg.el(
            'use',
            string.concat(
              svg.prop('href', '#c'),
              svg.prop('stroke', string.concat('#', colors[3])),
              svg.prop('stroke-dasharray', '99 180')
            )
          ),
          svg.el(
            'use',
            string.concat(
              svg.prop('href', '#c'),
              svg.prop('stroke', string.concat('#', colors[4])),
              svg.prop('stroke-dasharray', '99 240')
            )
          ),
          svg.el(
            'use',
            string.concat(
              svg.prop('href', '#c'),
              svg.prop('stroke', string.concat('#', colors[5])),
              svg.prop('stroke-dasharray', '99 300')
            )
          ),
          svg.el(
            'use',
            string.concat(
              svg.prop('href', '#c'),
              svg.prop('stroke', string.concat('#', colors[6])),
              svg.prop('stroke-dasharray', '99 360')
            )
          )
        )
      );
  }

  function attributes(string[7] memory colors, uint256 _tokenId)
    internal
    pure
    returns (string memory)
  {
    return
      string.concat(
        attributeString('Base Color', '#F2F3F5'),
        ',',
        attributeString('Color 1', string.concat('#ff', colors[0])),
        ',',
        attributeString('Color 2', string.concat('#', colors[1])),
        ',',
        attributeString('Color 3', string.concat('#', colors[2])),
        ',',
        attributeString('Color 4', string.concat('#', colors[3])),
        ',',
        attributeString('Color 5', string.concat('#', colors[4])),
        ',',
        attributeString('Color 6', string.concat('#', colors[5])),
        ',',
        attributeString('Color 7', string.concat('#', colors[6])),
        ',',
        attributeString('Seed', utils.uint2str(_tokenId))
      );
  }

  function name(uint256 _tokenId) internal pure returns (string memory) {
    return string.concat('Eeethers #', utils.uint2str(_tokenId + 1));
  }

  // Convenience functions for formatting all the metadata related to a particular NFT

  function getEeethersJSON(
    string memory _name,
    string memory _imageData,
    string memory _attributes
  ) internal pure returns (string memory) {
    return
      string.concat(
        '{"name": "',
        _name,
        '", "image": "data:image/svg+xml;base64,',
        _imageData,
        '","decription": "Exploring Ethereums endless spectrum of colors."',
        ',"attributes":[',
        _attributes,
        ']}'
      );
  }

  function attributeString(string memory _name, string memory _value)
    internal
    pure
    returns (string memory)
  {
    return
      string.concat(
        '{',
        kv('trait_type', string.concat('"', _name, '"')),
        ',',
        kv('value', string.concat('"', _value, '"')),
        '}'
      );
  }

  function kv(string memory _key, string memory _value)
    internal
    pure
    returns (string memory)
  {
    return string.concat('"', _key, '"', ':', _value);
  }
}
