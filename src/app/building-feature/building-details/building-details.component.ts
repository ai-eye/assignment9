import { Component, Input } from '@angular/core';

/** quick mock-up of simple ui */

@Component({
  selector: 'building-details',
  template: `
  <div class="container w-100">    
    <div class="card">
        <div class="card-header">
          <h3>Building Details</h3>
        </div>

        <div class="panel-body">
          <div class="container">        
          <br/>
            <div class="form-group">        
                <p><strong>Address:</strong></p>
                <p>{{address}}<p>

                <p><strong>Description:</strong></p>
                <p>{{description}}<p>      
            </div>        
        </div>    
      </div>
    </div>
    `
})

export class BuildingDetailsComponent {
  @Input() address: string;
  @Input() description: string;

  constructor() { }
}