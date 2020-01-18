
export default textmap;

function textmap(index = 0) {
    switch (index) {
        case 0:
            /* W-E */

            return `
                                         _______                                
                                        /D6     |      DESERT                   
                                       / Sand    |                              
                               _______/           |_______                      
                              /C5     |           /E5     |                     
                             /         |         / Sand    |                    
                     _______/           |_______/           |_______            
                    /B4     |           /D5     |           /F4     |           
                   /         |         / Sand    |         / Sand    |          
           _______/           |_______/           |_______/           |         
          /A3     |           /C4     |           /E4     |           /         
         /         |         /        o|         / Sand    |         /          
        /           |_______/          o|_______/           |_______/           
        |           /B3     |          o/D4     |           /F3     |           
         |         /         |        o/ Sand    |         /o        |          
          |_o_o_o_/           |_______/           |_______/o          |         
          /A2     |o          /C3     |           /E3 o o |           /         
 Blue    / Sand    |o        /        v|         /o        |         / Green    
 Defends/           |_o_o_o_/          v|_______/o          |_______/  Attacks  
 from   |           /B2     |o          /D3 v v |           /F2     |  from     
 here    |         / Sand    |o        /         |         /         | here     
          |_______/           |_______/           |_______/           |         
          /A1     |           /C2     |           /E2     |           /         
         / Sand    |         /o        |         /         |         /          
        /           |_______/o          |_______/           |_______/           
        |           /B1 v v |           /D2     |           /F1     |           
         |         /         |         /         |         /         |          
          |_______/           |_______/           |_v_v_v_/           |         
                  |           /C1     |          o/E1     |o          /         
o bottom of dune   |         /         |        o/ Sand    |o        /          
v bottom of cliff   |_______/           |_o_o_o_/           |_______/           
                            |          o/D1     |           /                   
                             |        o/ Sand    |         /                    
                              |_______/           |_______/                     
                                      |           /                             
                                       |         /                              
                                        |_______/                               
                                                                                
***** Sand *******************************************************************  
- Native: Lio Gri Hyd                                                           
- Entry slows non-flying non-native creatures.                                  
***** Dune *******************************************************************  
- Native: Lio Gri Hyd                                                           
- A native character adds two dice when striking down across a dune.            
- A non-native character loses one die when striking up across a dune.          
- A strike made across non-dune hexsides cannot carry-over up across a dune     
hexside.                                                                        
- A rangestrike may cross a single dune only if the rangestriker or target      
occupies the hex to which the dune is connected.                                
- A rangestrike may cross two dunes only if the rangestriker and the target     
occupy those dunes' hexes.                                                      
***** Cliff ******************************************************************  
- Non-flying characters may not cross cliffs.                                   
- Characters cannot strike across a cliff.                                      
- Adjacent characters separated by a cliff are not in contact with each other.  
- A rangestrike may cross a cliff only if the rangestriker is atop the cliff    
and the target is not at the base of the cliff, and vice versa.                 
- A rangestrike may cross one cliff before or after any number of slopes        
provided the rangestriker or the target occupies the hex atop the cliff.        
****************************************************************************** `;
        /**/
        case 1:
            /* NE-SW */
            return `
                                         _______                                
                                        /D6     |      TOWER                    
                                       /         |                              
                               _______/           |_______     Black            
                              /C5     |           /E5     |    Defends          
                             /         |         /         |   from here        
                     _______/           |_#_#_#_/           |_______            
                    /B4     |          #/D5     |#          /F4     |           
                   /         |        #/         |#        /         |          
           _______/           |_#_#_#_/           |_#_#_#_/           |         
          /A3     |          #/C4     |           /E4     |#          /         
         /         |        #/         |         /         |#        /          
        /           |_______/           |_#_#_#_/           |_______/           
        |           /B3     |          #/D4     |# Bk Wlo   /F3     |           
         |         /        #|        #/         |#        /#        |          
          |_______/          #|_______/           |_______/#          |         
          /A2     |          #/C3     |  Bk Wlo   /E3     |#          /         
         /         |        #/        #|   -4    /#        |#        /          
        /           |_______/          #|_______/#          |_______/           
        |           /B2     |           /D3 # # |  Bk Ttn   /F2     |           
         |         /        #|         /         |         /#        |          
          |_______/          #|_______/           |_______/#          |         
          /A1     |           /C2 # # |  Bk Ang   /E2 # # |           /         
         /         |         /        #|   -3    /#        |         /          
        /           |_______/          #|_______/#          |_______/           
        |           /B1     |           /D2 # # |           /F1     |           
         |         /         |         /         |         /         |          
          |_______/           |_______/           |_______/           |         
                  |  Gr Ogr   /C1     |           /E1     |  Gr Min   /         
# bottom of wall   |         /         |         /         |         /          
                    |_______/           |_______/           |_______/           
                            |           /D1     |  Gr Dra   /                   
                             |         /         |   -3    /                    
                              |_______/           |_______/                     
      Green                           |  Gr Min   /                             
      Attacks from here                |         /                              
                                        |_______/                               
                                                                                
***** Wall *******************************************************************  
- A non-flying character is slowed when moving up across a wall hexside.        
- Any character gains a skill-factor when striking down across a wall.          
- Any character loses a skill-factor when striking up across a wall.            
- Any rangestrike loses a skill-factor for each wall that it crosses going up.  
- A rangestrike may cross a single wall only if the rangestriker or the target  
occupies the hex to which that wall is connected.                               
- A rangestrike may cross two walls only if either the rangestriker or the      
target occupies the tower's center hex and neither one occupies a hex directly  
beneath the outer walls.                                                        
******************************************************************************`;
        /**/
        case 2:
            /* NW-SE */
            return `
                                         _______                                
                                        /D6     |      MARSH                    
      Gold                             /         |                              
      Attacks from here        _______/           |_______                      
                              /C5     |           /E5     |                     
                             /         |         /         |                    
                     _______/           |_______/           |_______            
                    /B4     |           /D5     |           /F4     |           
                   /         |         / Bog     |         /         |          
           _______/           |_______/           |_______/           |         
          /A3     |           /C4     |           /E4     |           /         
         / Bog     |         /         |         /         |         /          
        /           |_______/           |_______/           |_______/           
        |           /B3     |           /D4     |           /F3     |           
         |         /         |         /         |         /         |          
          |_______/           |_______/           |_______/           |         
          /A2     |           /C3 ===]|  Gd Cyc   /E3     |  Gd Ang   /         
         /         |         / Bog===] |   -1    / Bog     |         /          
        /           |_______/  [=====]  |_______/           |_______/           
        |           /B2     |  Gd Tro]  /D3     |  Gd Tro   /F2     |           
         |         /         | [=====] /         |         /         |          
          |_______/           |_______/           |_______/           |         
          /A1     |           /C2     |  Br Tro   /E2     |  Br Tro   /         
         /         |         / Bog     |   -8    /         |   -8    /          
        /           |_______/           |_______/           |_______/           
        |           /B1     |           /D2     |  Br Ran   /F1     |           
         |         /         |         /         |         /         |          
          |_______/           |_______/           |_______/           |         
                  |           /C1     |  Br Ttn   /E1     |  Gd Ran   /         
                   |         /         |         / Bog     |         /          
                    |_______/           |_______/           |_______/           
                            |  Br Tro   /D1     |           /                   
                             |   -6    /         |         /                    
                              |_______/           |_______/                     
                                      |  Br Wlo   /                             
                                       |         /     Brown                    
                                        |_______/      Defends from here        
                                                                                
***** Bog ********************************************************************  
- Native: Ogr Tro Ran Wyv Hyd                                                   
- Entry forbidden to non-native, non-flying characters.  A flying               
non-native character may not end its move on a Bog hex.                         
******************************************************************************`;
        /**/
        /* NE-SW */
        case 3:
            return `
                                         _______                                
                                        /D6     |      PLAINS                   
                                       /         |                              
                               _______/           |_______     Brown            
                              /C5     |           /E5     |    Defends          
                             /         |         /         |   from here        
                     _______/           |_______/           |_______            
                    /B4     |           /D5     |  Br Lio   /F4     |           
                   /         |         /         |         /         |          
           _______/           |_______/           |_______/           |         
          /A3     |           /C4     |           /E4     |  Br Ttn   /         
         /         |         /         |         /         |         /          
        /           |_______/           |_______/           |_______/           
        |           /B3     |           /D4     |           /F3     |           
         |         /         |         /         |         /         |          
          |_______/           |_______/           |_______/           |         
          /A2     |           /C3     |           /E3     |  Br Gar   /         
         /         |         /         |         /         |         /          
        /           |_______/           |_______/           |_______/           
        |           /B2     |           /D3     |           /F2     |           
         |         /         |         /         |         /         |          
          |_______/           |_______/           |_______/           |         
          /A1     |           /C2     |           /E2     |  Br Cen   /         
         /         |         /         |         /         |   -2    /          
        /           |_______/           |_______/           |_______/           
        |           /B1     |  Bu Ogr   /D2     |  Bu Cen   /F1     |           
         |         /         |         /         |         /         |          
          |_______/           |_______/           |_______/           |         
                  |           /C1     |  Bu Cen   /E1     |  Br Cen   /         
                   |         /         |         /         |   -3    /          
                    |_______/           |_______/           |_______/           
                            |  Bu Lio   /D1     |  Bu Lio   /                   
                             |         /         |         /                    
                              |_______/           |_______/                     
      Blue                            |  Bu Ttn   /                             
      Attacks from here                |         /                              
                                        |_______/                               
                                                                                
***** Bog ********************************************************************  
- Native: Ogr Tro Ran Wyv Hyd                                                   
- Entry forbidden to non-native, non-flying characters.  A flying               
non-native character may not end its move on a Bog hex.                         
******************************************************************************  
                                        `;
        /* */
        case 4:
        default:
            /* null */
            return `
                                         _______                                
                                        /D6     |      TOWER                    
                                       /         |                              
                               _______/           |_______                      
                              /C5     |           /E5     |                     
                             /         |         /         |                    
                     _______/           |_#_#_#_/           |_______            
                    /B4     |          #/D5     |#          /F4     |           
                   /         |        #/         |#        /         |          
           _______/           |_#_#_#_/           |_#_#_#_/           |         
          /A3     |          #/C4     |           /E4     |#          /         
         /         |        #/         |         /         |#        /          
        /           |_______/           |_#_#_#_/           |_______/           
        |           /B3     |          #/D4     |#          /F3     |           
         |         /        #|        #/         |#        /#        |          
          |_______/          #|_______/           |_______/#          |         
          /A2     |          #/C3     |           /E3     |#          /         
         /         |        #/        #|         /#        |#        /          
        /           |_______/          #|_______/#          |_______/           
        |           /B2     |           /D3 # # |           /F2     |           
         |         /        #|         /         |         /#        |          
          |_______/          #|_______/           |_______/#          |         
          /A1     |           /C2 # # |           /E2 # # |           /         
         /         |         /        #|         /#        |         /          
        /           |_______/          #|_______/#          |_______/           
        |           /B1     |           /D2 # # |           /F1     |           
         |         /         |         /         |         /         |          
          |_______/           |_______/           |_______/           |         
                  |           /C1     |           /E1     |           /         
# bottom of wall   |         /         |         /         |         /          
                    |_______/           |_______/           |_______/           
                            |           /D1     |           /                   
                             |         /         |         /                    
                              |_______/           |_______/                     
                                      |           /                             
                                       |         /                              
                                        |_______/                               
                                                                                
***** Wall *******************************************************************  
- A non-flying character is slowed when moving up across a wall hexside.        
- Any character gains a skill-factor when striking down across a wall.          
- Any character loses a skill-factor when striking up across a wall.            
- Any rangestrike loses a skill-factor for each wall that it crosses going up.  
- A rangestrike may cross a single wall only if the rangestriker or the target  
occupies the hex to which that wall is connected.                               
- A rangestrike may cross two walls only if either the rangestriker or the      
target occupies the tower's center hex and neither one occupies a hex directly  
beneath the outer walls.                                                        
******************************************************************************`;
        /**/
    }
}

/*

*/