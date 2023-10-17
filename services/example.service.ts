import BaseService from './base.service';

class ExampleService extends BaseService {
	constructor(state?: any) {
		super(state);
		this.name = 'example';
		this.model = {
		};
	}
}

export default ExampleService;
