// Компоненты
import { ModelRulesC } from '@a-a-game-studio/aa-components/lib';

/**
 * WorldFasa
 *
 * @ORM\Table(name="access_group")
 * @ORM\Entity
 */
export class AccessGroupE {
	// Имя таблицы
	public NAME = 'access_group';

	/**
     * Обновление ключевых записей таблицы
     */
	public getRulesUpdate() {
		const rules = new ModelRulesC();

		rules.set(rules.rule('create_access')
			.typeBool()
			.error('create_access - неверный формат'));

		rules.set(rules.rule('read_access')
			.typeBool()
			.error('read_access - неверный формат'));

		rules.set(rules.rule('update_access')
			.typeBool()
			.error('update_access - неверный формат'));

		rules.set(rules.rule('delete_access')
			.typeBool()
			.error('delete_access - неверный формат'));

		return rules.get();
	}

	/**
     *  Правила создания записей в таблице
     */
	public getRulesInsert() {
		const rules = new ModelRulesC();

		rules.set(rules.rule('group_id')
			.typeInt()
			.error('group_id - неверный формат'));

		rules.set(rules.rule('ctrl_access_id')
			.typeInt()
			.error('ctrl_access_id - неверный формат'));

		return rules.get();
	}
}
