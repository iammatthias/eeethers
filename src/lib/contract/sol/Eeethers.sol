//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import './Renderer.sol';

/*
           .-               .                      
   .;;;.`-'             ...;....;                  
  ;;  (_)   .-.  .-.     .'    ;;-.  .-.   .;.::.. 
  .;;; .-..;.-'.;.-'   .;     ;;  ;.;.-'   .;  .'; 
 ;;  .;  ; `:::'`:::'.;      .;`  ` `:::'.;' .' .' 
 `;.___.'                                   '      

 9999 max supply
 mint from contract 
*/

contract Eeethers is ERC721, Ownable {
  /// hello
  event Hello();

  function hello() internal {
    emit Hello();
  }

  //// ============ define variables ============
  // mapping(uint256 => string) private tokenMetadata;

  uint256 public cost = 0.05 ether;
  uint256 public constant MAX_TOKENS = 9999;
  uint256 public tokenId;

  constructor() ERC721('Eeethers', 'ethrs') {
    hello();
  }

  /// ============ token functions ============

  event Mint(uint256 _tokenId);

  function mint() public payable {
    require(tokenId < MAX_TOKENS, 'No eeethers remaining');
    // require(msg.value >= 0.05 ether, "Not enough ETH");
    // tokenMetadata[tokenId] = renderer.render(tokenId);
    _mint(msg.sender, tokenId);
    emit Mint(tokenId);
    tokenId++;
  }

  function tokenURI(uint256 _tokenId)
    public
    view
    override
    returns (string memory)
  {
    return
      // tokenMetadata[_tokenId];
      renderer.render(_tokenId);
  }

  /* ADMIN */
  function withdrawAll() external {
    payable(owner()).transfer(address(this).balance);
  }

  function withdrawAllERC20(IERC20 _erc20Token) external {
    _erc20Token.transfer(owner(), _erc20Token.balanceOf(address(this)));
  }

  event MetadataUpdated(uint256 indexed tokenId);

  // Store renderer as separate contract so we can update it if needed
  Renderer public renderer;

  function setRenderer(Renderer _renderer) external onlyOwner {
    renderer = _renderer;
    emit MetadataUpdated(type(uint256).max);
  }
}
