<template>
	<v-layout>
		<v-flex xs12 sm6 offset-sm3>
			<v-card>
				<v-card-title primary-title>
					<h2>Calculator</h2>
				</v-card-title>
				<v-card-text>
					<p>Fill in the required fields below to calculate the amount each person owes.</p>
					<v-layout>
						<v-flex>
							<h3>Order Details</h3>
							<v-form>
								<v-container>
									<v-layout>
										<v-flex xs12 md4>
											<v-text-field
												label="Order Name" v-model="orderInfo.name"
											/>
										</v-flex>
										<v-flex xs12 md4>
											<v-text-field
												type="number" :rules="[validateNumber]" prefix="$"
												label="Total Order Cost" v-model="orderInfo.deliveryTotal"
											/>
										</v-flex>
									</v-layout>
								</v-container>
							</v-form>
							<br/>
							<h3>People</h3>
							<v-container v-for="(person, ind) in people" :key="ind">
								<v-layout>
									<v-flex xs12 md4>
										<v-text-field
											label="Name" v-model="person.name"
										/>
									</v-flex>
									<v-flex xs12 md4>
										<v-text-field
											type="number" :rules="[validateNumber]" prefix="$"
											label="Order Cost (from receipt)" v-model="person.foodCost"
										/>
									</v-flex>
									<v-flex xs12 md4>
										<v-text-field
											disabled prefix="$"
											label="What they owe" :value="orderTotal > 0 ? (Math.round(parseFloat(person.foodCost) / orderTotal * parseFloat(orderInfo.deliveryTotal) * 100) / 100) : 0"
										/>
									</v-flex>
									<v-flex xs12 md4>
										<v-card-actions>
											<v-btn fab small right color="error" @click="people.splice(ind, 1)" >x</v-btn>
										</v-card-actions>
									</v-flex>
								</v-layout>
							</v-container>
							
							Food Total: ${{orderTotal}}
						</v-flex>
					</v-layout>
				</v-card-text>
				<v-card-actions>
					<v-btn color="info" @click="addPerson">Add Person</v-btn>
					<v-btn color="info" @click="save">Save Order</v-btn>
				</v-card-actions>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
export default {
	data(){
		return {
			people: [],
			orderInfo: {
				deliveryTotal: 0,
				name: "",
			}
		}
	},
	computed: {
		orderTotal(){
			let value = 0;
			this.people.forEach(element => {
				value += parseFloat(element.foodCost);
			});
			return value;
		},
		dataObject: {
			get(){
				return {
					people: this.people,
					orderInfo: this.orderInfo
				}
			},
			set(value)
			{
				this.$set(this, "people", value.people)
				this.$set(this, "orderInfo", value.orderInfo)
			}
		}
	},
	methods: {
		validateNumber(input)
		{
			let v = parseFloat(input);
			if (isNaN(v))
				return "Input must be a number"
			return true;
		},
		addPerson()
		{
			this.people.push({
				name: "",
				foodCost: 0
			})
		},
		save()
		{
			window.localStorage.setItem(`Delivery_${this.orderInfo.name}`, JSON.stringify(this.dataObject))
		},
		getList()
		{
			let list = []
			for(var i in localStorage)
			{
				if (i.match("Delivery_"))
				{
					list.push({index: i, data: JSON.parse(localStorage.getItem(i))})
				}
			}
			return list;
		}
	},
	mounted()
	{
		// This is terrible, but this is a little one-off app so it really doesn't matter
		window.loadOrder = (order)=>{
			this.dataObject = order;
		}
		window.getOrders = ()=>{
			return this.getList()
		}
	},
	beforeDestroy()
	{
		window.loadOrder = ()=>{}
		window.getOrders = ()=>{return []}
	}
}
</script>